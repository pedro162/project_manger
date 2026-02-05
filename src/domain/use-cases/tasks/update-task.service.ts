import { Injectable } from '@nestjs/common';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';
import { UpdateTaskDto } from 'src/gateways/controllers/tasks/dtos/update-task.dto';

@Injectable()
export class UpdateTaskService implements BaseUseCase{
    constructor(
        private readonly userRepository: UsersRepositoryService,
        private readonly taskRepository: TasksRepositoryService,
        private readonly projectRepository: ProjectsRepositoryService
    ) { }

    async execute(payload:{task:UpdateTaskDto ,userId: number}) {
        const userData = await this.userRepository.findById(payload.userId);

        if(!userData){
            throw new Error('User not found');
        }
        
        await this.taskRepository.updateById(payload.task.id, payload.task);

        const task = await this.taskRepository.findById(userData.id,payload.task.id);

        if(!task){
            throw new Error('Task not found');
        }

      return task;
    }
}
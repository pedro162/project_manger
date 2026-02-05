import { Injectable } from '@nestjs/common';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { BaseUseCase } from '../base-use-case';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { ITask } from 'src/domain/interfaces/task.interface';

@Injectable()
export class GetAllTasksService implements BaseUseCase{
    constructor(
        private readonly userRepository: UsersRepositoryService,
        private readonly taskRepository: TasksRepositoryService
    ) { }

    async execute(payload:{userId: number}): Promise<ITask[]> {
        const userData = await this.userRepository.findById(payload.userId);

        if(!userData){
            throw new Error('Project not found for the user');
        }

        const tasks = await this.taskRepository.findAll(userData?.id || 0);

        if(!tasks){
            throw new Error('Error fetching tasks');
        }
        console.log({tasks});
        return tasks;
    }       
}

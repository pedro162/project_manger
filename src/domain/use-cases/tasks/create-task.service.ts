import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { CreateTaskDto } from 'src/gateways/controllers/tasks/dtos/create-task.dto';
import { ITask } from 'src/domain/interfaces/task.interface';

@Injectable()
export class CreateTaskService implements BaseUseCase{
    constructor(
        private readonly userRepository: UsersRepositoryService,
        private readonly taskRepository: TasksRepositoryService,
        private readonly projectRepository: ProjectsRepositoryService
    ) { }

    async execute(payload:{task:CreateTaskDto, userId:number}): Promise<ITask> {
        // Implement the logic to create a task here
        const userData = await this.userRepository.findById(payload.userId);
        const projectData = await this.projectRepository.findById(userData?.id || 0, payload.task.projectId);

        if(!projectData){
            throw new Error('Project not found for the user');
        }

        const createTask = await this.taskRepository.add({
            name: payload.task.name,
            status: payload.task.status,
            project: { id: projectData.id },
            user: { id: userData?.id }
        });

        if(!createTask){
            throw new Error('Error creating task');
        }

        return createTask;
    }
}

import { Injectable } from '@nestjs/common';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';

@Injectable()
export class GetTaskByIdService  implements BaseUseCase{
    constructor(
        private readonly userRepository: UsersRepositoryService,
        private readonly taskRepository: TasksRepositoryService
    ) { }

    async execute(payload:{userId: number, taskId:number}) { 
        const userData = await this.userRepository.findById(payload.userId);

        const task = await this.taskRepository.findById(userData?.id || 0, payload.taskId);

        if(!task){
            throw new Error('Error fetching task');
        }

        return task;
    }    
}

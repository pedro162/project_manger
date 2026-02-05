import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { IProject } from 'src/domain/interfaces/project.interface';

@Injectable()
export class GetAllProjectsService implements BaseUseCase{
    constructor(
            private readonly projectRepository: ProjectsRepositoryService,
            private readonly userRepository: UsersRepositoryService
    ) { }
    
    async execute(userId: number): Promise<IProject[]> {
        const userData = await this.userRepository.findById(userId);

        return await this.projectRepository.findAll(userData?.id || 0);
    }
}

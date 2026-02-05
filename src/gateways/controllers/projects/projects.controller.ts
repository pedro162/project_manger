import {
    Controller,
    Get,
    Req,
    NotFoundException,
    Param,
    Post,
    Body,
    UnprocessableEntityException
 } from '@nestjs/common';

import { IProject } from 'src/domain/interfaces/project.interface';
import { CreateProjectService } from 'src/domain/use-cases/projects/create-project.service';
import { GetAllProjectsService } from 'src/domain/use-cases/projects/get-all-projects.service';
import { GetProjectByIdService } from 'src/domain/use-cases/projects/get-project-by-id.service';
import { CreateProjectDto } from './dtos/create-project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly createProjectService: CreateProjectService,
        private readonly getAllProjectsService: GetAllProjectsService,
        private readonly getProjectByIdService: GetProjectByIdService
    ) {}

    @Get()
    async findAll(@Req() req): Promise<IProject[]> {
         try{
            const loggedUser = req.user;
            const projects = await this.getAllProjectsService.execute(loggedUser.sub);
            return projects;
         }catch(error){
            throw new UnprocessableEntityException(error);
        }
    }

    @Get(':id')
    async findById(@Req() req, @Param('id') id: number): Promise<IProject> {
        try{
            const loggedUser = req.user;
            const project = await this.getProjectByIdService.execute({ userId: loggedUser.sub, projectId: Number(id) });
            if (!project) {
                throw new NotFoundException('Project not found');
            }
            
            return project;
        }catch(error){
            throw new UnprocessableEntityException('Invalid project ID');
        }
    }

    @Post()
    async create(@Req() req, @Body() createProjectDto: CreateProjectDto): Promise<IProject> {
        try{
            const loggedUser = req.user;
            //console.log(createProjectDto)
            //console.log(loggedUser);
            const project = await this.createProjectService.execute({
                project: createProjectDto,
                userId: loggedUser.sub
            });

            return project;
        }catch(error){
            throw new UnprocessableEntityException(error);
        }
    }
}

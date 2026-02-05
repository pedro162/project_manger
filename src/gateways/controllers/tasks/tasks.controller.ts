import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { CreateTaskService } from 'src/domain/use-cases/tasks/create-task.service';
import { GetAllTasksService } from 'src/domain/use-cases/tasks/get-all-tasks.service';
import { GetTaskByIdService } from 'src/domain/use-cases/tasks/get-task-by-id.service';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly getAllTasksUseCase: GetAllTasksService,
        private readonly getTaskByIdUseCase: GetTaskByIdService,
        private readonly createTaskUseCase: CreateTaskService,
    ) { }

    @Get()
    async findAll(@Req() req) {
        try{
            const loggedUser = req.user;
            return await this.getAllTasksUseCase.execute({userId: loggedUser.sub});
        }catch(error){
            throw new Error('Error fetching tasks');
        }
    }

    @Get(':id')
    async findById(@Req() req, @Param('id') taskId: number) {
        try{
            const loggedUser = req.user;
            return await this.getTaskByIdUseCase.execute({ userId: loggedUser.sub, taskId: Number(taskId) });
        }catch(error){
            throw new Error('Error fetching task by ID');
        }
    }

    @Post()
    async create(@Req() req, @Body() body:CreateTaskDto) {
        try{
            const loggedUser = req.user;
            return await this.createTaskUseCase.execute({ userId: loggedUser.sub, task: body });
        }catch(error){
            console.error(error);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}

import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { ProjectEntity } from '../entities/project.entity';
import { ITasksRepository } from 'src/domain/repositories/tasks-repository.interface';
import { ITask } from 'src/domain/interfaces/task.interface';
import { TasksEntity } from '../entities/task.entity';

@Injectable()
export class TasksRepositoryService extends Repository<TasksEntity> implements ITasksRepository{
    constructor(dataSource:DataSource){
        super(TasksEntity, dataSource.createEntityManager());
    }

    findAll(userId:number):Promise<ITask[]>{
        return this.findBy({ user: { id:userId } });
    }
    
    findById(userId: number, id:number):Promise<ITask | null>{
        return this.findOneOrFail( {
            where: { id, user:{id:userId} },
            relations: ['project']
        });
    }
    
    add(payload:DeepPartial<ITask>):Promise<ITask>{
        return this.save(payload);
    }

    updateById(id:number, payload: DeepPartial<ITask>){
        this.update(id, payload);
    }
}

import { Global, Module } from '@nestjs/common';
import { ProjectsRepositoryService } from './repositories/projects.repository.service';
import { TasksRepositoryService } from './repositories/tasks.repository.service';
import { UsersRepositoryService } from './repositories/users.repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './entities/task.entity';
import { ProjectEntity } from './entities/project.entity';
import { UserEntity } from './entities/user.entity';

@Global()
@Module({
  imports:[
    DatabaseModule,
    TypeOrmModule.forFeature([UserEntity, ProjectEntity, TasksEntity]),
    TypeOrmModule.forRoot({
      type:'sqlite',
      database: 'db/sql.sqlite',
      entities:['dist/**/*.entity{.ts,.js}'],
      synchronize:true,
      autoLoadEntities:true,
    })
  ],
  providers: [ProjectsRepositoryService, TasksRepositoryService, UsersRepositoryService],
  exports:[ProjectsRepositoryService, TasksRepositoryService, UsersRepositoryService]
})
export class DatabaseModule {}

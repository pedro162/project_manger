import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { IUsersRepository } from 'src/domain/repositories/users-repositories.interface';
import { IUser } from 'src/domain/interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepositoryService extends Repository<UserEntity> implements IUsersRepository{
    
    constructor(dataSource: DataSource){
        super(UserEntity, dataSource.createEntityManager());
    }

    findAll(): Promise<IUser[]> {
        return this.find();
    }

    findById(id:number):Promise<IUser | null>{
        return this.findOneByOrFail({id});
    }

    add(payload:DeepPartial<IUser>):Promise<IUser>{
        return this.save(payload);
    }

    findByEmail(email:string):Promise<IUser | null>{
        return this.findOneByOrFail({email});
    }
}

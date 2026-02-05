import { Injectable } from '@nestjs/common';
import { IUser } from 'src/domain/interfaces/user.interface';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';

@Injectable()
export class GetUserByIdService implements BaseUseCase {
    constructor(private readonly userRepository:UsersRepositoryService){}

    async execute(userId:number):Promise<IUser | null>{
        return await this.userRepository.findById(userId);
    }
}

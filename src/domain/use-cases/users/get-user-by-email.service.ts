import { Injectable } from '@nestjs/common';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';
import { IUser } from 'src/domain/interfaces/user.interface';

@Injectable()
export class GetUserByEmailService implements BaseUseCase{
    constructor(
        private readonly usersRepository: UsersRepositoryService
    ) {}

    async execute(email: string):Promise<IUser>  {
        const user =  await this.usersRepository.findByEmail(email);

        if(!user){
            throw new Error('User not found');
        }

        return user;
    }
}

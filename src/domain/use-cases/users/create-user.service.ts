import { Injectable } from '@nestjs/common';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';
import { CreateUserDto } from 'src/gateways/controllers/users/dto/create-user.dto';
import { IUser } from 'src/domain/interfaces/user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUserService implements BaseUseCase{
    private readonly DEFATULT_SALT_ROUNDS = 10;
    constructor(private readonly userRepository: UsersRepositoryService){

    }

    async execute(user:CreateUserDto):Promise<IUser>{
        const hashedPassword = await hash(user.password, this.DEFATULT_SALT_ROUNDS);

        const createdUser = await this.userRepository.add({ ...user, password: hashedPassword });

        if(!createdUser){
            throw new Error('Usuáiro não pôde ser criado.')
        }

        return createdUser;
    }
}

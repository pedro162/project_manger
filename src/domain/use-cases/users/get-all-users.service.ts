import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { IUser } from 'src/domain/interfaces/user.interface';

@Injectable()
export class GetAllUsersService implements BaseUseCase{
    constructor(
        private readonly userRepository: UsersRepositoryService
    ) { }

    async execute(): Promise<IUser[]> {
        return await this.userRepository.findAll();
    }       
}

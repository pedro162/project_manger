import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { GetUserByIdService } from 'src/domain/use-cases/users/get-user-by-id.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserService } from 'src/domain/use-cases/users/create-user.service';
import { IUser } from 'src/domain/interfaces/user.interface';
import { GetAllUsersService } from 'src/domain/use-cases/users/get-all-users.service';
import { Public } from 'src/gateways/guards/auth-guard.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly getUserByIdUseCase: GetUserByIdService,
        private readonly getAllUsersUseCase: GetAllUsersService,
        private readonly createUserUseCase: CreateUserService,
    ) { }

    @Get()
    async findAll() {
        try{
            return await this.getAllUsersUseCase.execute();
        }catch(error){
            throw new Error('Error fetching users');
        }
    }
    @Get(':id')
    async findById(@Req() req, @Param('id') id: number): Promise<IUser> {
        try{
            const user = await this.getUserByIdUseCase.execute(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }catch(error){
            throw new Error('Error fetching user by ID');
        }
    }

    @Post()
    @Public()
    async create(@Req() req, @Body() createUserDto: CreateUserDto): Promise<IUser> {
        try{
            return await this.createUserUseCase.execute(createUserDto);
        }catch(error){
            throw new Error('Error creating user');
        }
    }
}

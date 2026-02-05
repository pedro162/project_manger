import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    firstName: string;
    
    @IsNotEmpty()
    @IsString()
    lastName?: string;
    
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;
}
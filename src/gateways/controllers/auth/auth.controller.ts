import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/infrastructure/auth/auth.service';
import { LoginDto } from './dtos/login.dto';
import { Public } from 'src/gateways/guards/auth-guard.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    async login(@Body() loginDto: LoginDto){
        return await this.authService.login(loginDto.email, loginDto.password);
    }
}

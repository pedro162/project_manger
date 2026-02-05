import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { GetUserByEmailService } from 'src/domain/use-cases/users/get-user-by-email.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly getUserByEmailService: GetUserByEmailService,
        private readonly jwtService: JwtService
    ) {}

    async login(email: string, password: string) {
        const user = await this.getUserByEmailService.execute(email);

        const isValidUser = await compare(password, user.password);

        if (!isValidUser) {
            throw new Error('Invalid credentials');
        }

        const payload = { sub: user.id, username: user.email };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { jwtConstants } from 'src/infrastructure/auth/constants';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = ()=>SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuardService implements CanActivate{
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const decoded = await this.jwtService.verifyAsync(token,{
                secret: jwtConstants.secret
            });
            
            request.user = decoded;
            return true;
        } catch (err) {
            throw new UnauthorizedException();
        }   
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const authHeader = request.headers?.authorization;
        if (!authHeader) return undefined;
        const [type, token] = authHeader.split(' ');
        return type === 'Bearer' && token ? token : undefined;
    }
}

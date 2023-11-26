// src/guards/auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';
import { UserRole } from 'src/users/user.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    console.info('AuthGaurd');
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!roles) {
      return true; // No roles specified, access is granted
    }
    console.info('AuthGaurd:', roles);

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token || this.authService.isTokenInvalidated(token)) {
      throw new UnauthorizedException('Unauthorized'); // Throw an exception for unauthorized access
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret key
      request.user = decoded;
      return roles.includes(request.user.role);
    } catch (error) {
      throw new UnauthorizedException('Unauthorized'); // Throw an exception for unauthorized access
    }
  }

  private extractTokenFromHeader(request: any): string | null {
    const authorizationHeader = request.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      return authorizationHeader.slice(7); // Remove 'Bearer ' from the token
    }

    return null;
  }
}

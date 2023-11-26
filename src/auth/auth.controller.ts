// controllers/auth.controller.ts
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserRole, User } from '../users/user.model';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('role') role: UserRole = UserRole.USER,
  ): Promise<User> {
    try {
      const user = await this.authService.register(username, password, role);
      return user;
    } catch (error) {
      return error;
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{ token: string }> {
    const user = await this.authService.findByUsername(username);

    if (
      !user ||
      !(await this.authService.comparePasswords(password, user.password))
    ) {
      throw new Error('Invalid credentials');
    }

    const token = this.authService.generateToken(user);
    return { token };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  logout(@Request() req: any, @Res() res: Response): void {
    this.authService.logout(req.user, req.headers.authorization); // Pass the token from the header
    res.clearCookie('token');
    res.end();
  }
}

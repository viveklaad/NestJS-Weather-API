// services/auth.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole } from '../users/user.model';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  private invalidatedTokens: string[] = [];

  async register(
    username: string,
    password: string,
    role: UserRole = UserRole.USER,
  ): Promise<User> {
    try {
      const hashedPassword = await hash(password, 10);

      const existingUser = await this.userModel.findOne({ username }).exec();
      if (existingUser) {
        throw new ConflictException('Username already exists');
      }

      const newUser = new this.userModel({
        id: uuidv4(),
        username,
        password: hashedPassword,
        role,
      });
      await newUser.save();
      return newUser;
    } catch (error) {
      // Handle other errors as needed
      throw error;
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  generateToken(user: User): string {
    const expiresIn = '1h';
    const secretKey = process.env.JWT_SECRET// Replace with your actual secret key

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      secretKey,
      { expiresIn },
    );
    return token;
  }

  logout(user: User, token: string): void {
    // Implement any necessary business logic for logout (optional)

    // Add the token to the invalidatedTokens list
    this.invalidatedTokens.push(token);
  }

  isTokenInvalidated(token: string): boolean {
    // Check if the token is in the invalidatedTokens list
    return this.invalidatedTokens.includes(token);
  }
}

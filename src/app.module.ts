// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { WeatherController } from './weather/weather.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { WeatherService } from './weather/weather.service';
import { User, UserSchema } from './users/user.schema';

console.info("Testvivek", `${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/assignment'), //Replace your mongoDB URL
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController, WeatherController],
  providers: [AuthService, UsersService, WeatherService],
})
export class AppModule {}

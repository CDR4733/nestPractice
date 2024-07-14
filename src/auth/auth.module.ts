import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  // TypeORM을 통해 User 테이블 정보를 받아서 쓰겠다!
  imports: [TypeOrmModule.forFeature([User])],
  // Controller, Service 지정
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

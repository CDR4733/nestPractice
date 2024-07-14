import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';

// 이렇게 ApiTage를 달아두면 Swagger에서 태그별로 분류가 되어 편리하다.
@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 회원 가입 API
   * @param signUpDto
   * @returns
   */
  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const data = await this.authService.signUp(signUpDto);
    return {
      status: HttpStatus.CREATED,
      message: '회원가입에 성공했습니다.',
      data: data,
    };
  }
}

import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { SignUpDto } from './dto/sign-up.dto';
import { DEFAULT_CUSTOMER_POINT } from 'src/constants/point.constant';

import { User } from 'src/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /** 회원 가입 API **/
  async signUp(signUpDto: SignUpDto) {
    // 0. 필요한 정보 받아오기
    const { email, nickname, password, passwordConfirm } = signUpDto;

    // 1. 비밀번호 검증 : '비밀번호' & '비밀번호 확인' 일치하는지?
    // 1-1. '비밀번호', '비밀번호 확인' 비교
    const isPasswordMatched = password === passwordConfirm;
    // 1-2. 일치하지 않으면 에러처리
    if (!isPasswordMatched) {
      throw new BadRequestException(
        '비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.',
      );
    }

    // 2. 이메일 검증 : 해당 이메일로 가입한 사용자가 있는지?
    // 2-1. users 테이블에서 입력된 email 조회
    const isExistingEmail = await this.userRepository.findOneBy({
      email: email,
    });
    // 2-2. 이미 가입된 이메일이면 에러처리
    if (isExistingEmail) {
      throw new ConflictException('이미 가입된 이메일 입니다.');
    }

    // 3. 회원 가입
    // 3-1. 비밀번호 Hash
    // 3-1-1. configService로 .env의 PASSWORD_HASH_ROUNDS 가져오기
    const hashRounds = this.configService.get<number>('PASSWORD_HASH_ROUNDS');
    // 3-1-2. 비밀번호 Hash 해주기
    const hashedPassword = bcrypt.hashSync(password, hashRounds);
    // 3-2. 회원 가입 완료하기
    const user = await this.userRepository.save({
      email: email,
      nickname: nickname,
      password: hashedPassword,
      points: DEFAULT_CUSTOMER_POINT,
    });

    // 4. controller에 결과 전달
    // 4-1. password는 제외
    user.password = undefined;
    // 4-2. 전달
    return user;
  }
}

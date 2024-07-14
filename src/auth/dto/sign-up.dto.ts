import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

// extends PickType : 기존 User 엔터티를 활용하기 위해
export class SignUpDto extends PickType(User, [
  'email',
  'password',
  'nickname',
]) {
  /**
   * 비밀번호 확인
   * @example "Aaaa!111"
   */
  @IsNotEmpty({ message: '비밀번호 확인을 입력해 주세요.' })
  @IsStrongPassword(
    // 빈칸으로 두면 default 값 (아래 default 값 내용)
    // { minLength(최소길이):8, minLowercase(소문자):1, minUppercase(대문자):1,
    //   minNumbers(숫자):1, minSymbols(특수문자):1, returnScore:false, ...}
    {},
    {
      message:
        '비밀번호는 영문 알파벳 대/소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.',
    },
  )
  passwordConfirm: string;
}

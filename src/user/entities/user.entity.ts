import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Book } from 'src/book/entities/book.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  // autoIncrement 방식 프라이머리키컬럼 생성
  @PrimaryGeneratedColumn({ unsigned: true }) // unsigned: 음수값 제거
  userId: number;

  /**
   * 이메일
   * @example "aaaa1111@naver.com"
   */
  @IsNotEmpty({ message: '이메일을 입력해 주세요.' })
  @IsEmail(
    {
      /**빈칸으로 두면 default값**/
    },
    { message: '이메일 형식에 맞지 않습니다.' },
  )
  @Column({ unique: true }) // unique: 유니크 여부
  email: string;

  /**
   * 닉네임
   * @example "김에이"
   */
  @IsNotEmpty({ message: '닉네임을 입력해 주세요.' })
  @IsString()
  @Column()
  nickname: string;

  /**
   * 비밀번호
   * @example "Aaaa!111"
   */
  @IsNotEmpty({ message: '비밀번호 확인을 입력해 주세요.' })
  @IsStrongPassword(
    // 빈칸으로 두면 default 값 (아래 default 값 내용)
    // { minLength(최소길이):8, minLowercase(소문자):1, minUppercase(대문자):1,
    //   minNumbers(숫자):1, minSymbols(특수문자):1, returnScore:false, ...}
    {
      /**빈칸으로 두면 default값**/
    },
    {
      message:
        '비밀번호는 영문 알파벳 대/소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.',
    },
  )
  @Column({ select: false }) // 데이터 조회시 select 되지 않도록
  password: string;

  @IsNumber()
  @Column({ unsigned: true }) // unsigned: 음수값 제거 여부
  points: number;

  @IsBoolean()
  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}

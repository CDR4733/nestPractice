import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    // DB에 자동으로 스네이크케이스로 컬럼명을 지정해줌
    namingStrategy: new SnakeNamingStrategy(),
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    synchronize: configService.get<boolean>('DB_SYNC'),
    // 엔터티 추가될 때마다 자동으로 등록해줌
    autoLoadEntities: true,
    // CRUD 할 때마다 터미널에 로그기록이 남아 개발할 때 편함
    logging: true,
  }),
};

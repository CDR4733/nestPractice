import { Schedule } from 'src/show/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn({ unsigned: true })
  bookId: number;

  @Column({ unsigned: true })
  userId: number;

  @Column({ unsigned: true })
  scheduleId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.books, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Schedule, { onDelete: 'CASCADE' })
  schedule: Schedule;
}

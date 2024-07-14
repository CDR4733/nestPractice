import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn({ unsigned: true })
  seatId: number;

  @Column({ unsigned: true })
  scheduleId: number;

  @Column({ unsigned: true })
  availableSeats: number;

  @Column({ unsigned: true })
  totalSeats: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Schedule, (schedule) => schedule.seat)
  @JoinColumn()
  schedule: Schedule;
}

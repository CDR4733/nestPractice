import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Show } from './show.entity';
import { Seat } from './seat.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn({ unsigned: true })
  scheduleId: number;

  @Column()
  showId: number;

  @Column({ type: 'date' })
  showDate: Date;

  @Column({ type: 'time' })
  showTime: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Show, (show) => show.schedules, { onDelete: 'CASCADE' })
  show: Show;

  @OneToOne(() => Seat, (seat) => seat.schedule)
  seat: Seat;
}

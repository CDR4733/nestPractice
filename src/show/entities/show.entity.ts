import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { ShowCategory } from '../types/show-category.type';
import { Schedule } from './schedule.entity';

@Entity('shows')
export class Show {
  @PrimaryGeneratedColumn({ unsigned: true })
  showId: number;

  @Column({ unique: true })
  showName: string;

  @Column({ type: 'text' })
  showDetail: string;

  @Column({ type: 'enum', enum: ShowCategory })
  showCategory: ShowCategory;

  @Column()
  showPlace: string;

  @Column()
  showFee: number;

  @Column()
  showImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Schedule, (schedule) => schedule.show, { cascade: true })
  schedules: Schedule[];
}

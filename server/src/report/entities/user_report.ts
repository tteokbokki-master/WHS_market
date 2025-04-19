import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from '../../auth/entities/user/user';

Unique(['reporter', 'reported']);
@Entity('user_report')
export class UserReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => User, { nullable: false })
  reporter: User;

  @ManyToOne(() => User, { nullable: false })
  reported: User;

  @CreateDateColumn()
  createdAt: Date;
}

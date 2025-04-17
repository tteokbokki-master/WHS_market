import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user/user';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column()
  productId: number;

  @ManyToOne(() => User)
  reporter: User;

  @ManyToOne(() => User)
  reported: User;
}

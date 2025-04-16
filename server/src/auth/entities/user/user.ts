import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Product } from '../../../product/entities/product.entity';
import { OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}

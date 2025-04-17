import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

import { Product } from '../../../product/entities/product.entity';
import { OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Wallet } from 'src/wallet/entities/wallet.entity';

@Entity()
export class User {
  @Column({ type: 'timestamp', nullable: true })
  banUntil: Date | null;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'text', nullable: true, default: null })
  introduce: string | null;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToOne(() => Wallet, (wallet) => wallet.user, { cascade: true })
  wallet: Wallet;
}

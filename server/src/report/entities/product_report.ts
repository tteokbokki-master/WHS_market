import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from '../../auth/entities/user/user';
import { Product } from '../../product/entities/product.entity';

@Unique(['reporter', 'product'])
@Entity('product_report')
export class ProductReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => User, { nullable: false })
  reporter: User;

  @ManyToOne(() => Product, { nullable: false })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;
}

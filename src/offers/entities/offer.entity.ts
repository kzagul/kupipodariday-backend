import { User } from '@users/entities/user.entity';
import { Wish } from '@wishes/entities/wish.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  amount: number;

  @Column({ default: false })
  hidden: boolean;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers, { onDelete: 'CASCADE' })
  item: Wish;
}

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
//   ManyToOne,
// } from 'typeorm';
// import { User } from '@users/entities/user.entity';
// import { Wish } from '@wishes/entities/wish.entity';

// @Entity()
// export class Offer {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   @ManyToOne(() => User, (user) => user.offers)
//   user: User;

//   @ManyToOne(() => Wish, (wish) => wish.offers, { onDelete: 'CASCADE' })
//   item: Wish;

//   @Column('decimal', { precision: 10, scale: 2 })
//   amount: number;

//   @Column({ default: false })
//   hidden: boolean;
// }

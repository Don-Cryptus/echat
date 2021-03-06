import { Lazy } from '../utils';
import { Field, Float, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  RelationId,
  ManyToOne,
} from 'typeorm';
import { Review } from './Review';
import { User } from './User';
import { UserService } from './UserService';

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ default: 'pending' })
  status: 'cancelled' | 'pending' | 'started' | 'completed' | string;

  @Field(() => Float)
  @Column({ type: 'float' })
  price: number;

  @Field(() => Int)
  @Column()
  rounds: number;

  @Field()
  @Column()
  per: string;

  @Field()
  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  startedTime: Date;

  @Field(() => Float)
  @Column({ type: 'float' })
  finalPrice: number;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, (user) => user.buyerOrders, {
    lazy: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @TypeormLoader(() => User, (order: Order) => order.buyerId)
  buyer: Promise<User>;

  @Field(() => Int)
  @Column()
  @RelationId((order: Order) => order.buyer)
  buyerId: number;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, (user) => user.sellerOrders, {
    lazy: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @TypeormLoader(() => User, (order: Order) => order.sellerId)
  seller: Promise<User>;

  @Field(() => Int)
  @Column()
  @RelationId((order: Order) => order.seller)
  sellerId: number;

  @Field(() => UserService, { nullable: true })
  @ManyToOne(() => UserService, (userService) => userService.orders, {
    lazy: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @TypeormLoader(() => User, (order: Order) => order.userServiceId)
  userService?: Promise<UserService>;

  @Field(() => Int)
  @Column()
  @RelationId((order: Order) => order.userService)
  userServiceId: number;

  // Review
  @Field(() => Review, { nullable: true })
  @OneToOne(() => Review, (review) => review.order, {
    nullable: true,
    lazy: true,
  })
  @TypeormLoader(() => Review, (review: Review) => review.orderId, {
    selfKey: true,
  })
  review: Lazy<Review | null>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Booking from "./Booking";
import User from "./User";

@ObjectType()
@Entity("like")
export default class Like extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  value: number; // either 1 or 0

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.bookingLikes, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @Field(() => Booking, { nullable: true })
  @ManyToOne(() => Booking, (booking) => booking.userLikes, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  booking: Booking;
}

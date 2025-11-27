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
@Entity("appointment")
export default class Appointment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "text" })
  date: string;

  @Field()
  @Column({ type: "text" })
  from: string;

  @Field()
  @Column({ type: "text" })
  to: string;

  @Field(() => Booking, { nullable: true })
  @ManyToOne(() => Booking, (booking) => booking.appointments, { eager: true })
  @JoinColumn()
  booking: Booking;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.appointments, { eager: true })
  @JoinColumn()
  user: User;
}

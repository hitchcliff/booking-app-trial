import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Appointment from "./Appointment";
import User from "./User";

@ObjectType()
@Entity("booking")
export default class Booking extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column({ type: "text" })
  body: string;

  @Field()
  @Column({ type: "text" })
  title: string;

  // owner of the booking
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.bookings, { eager: true })
  @JoinColumn()
  user: User;

  // appointment of the booking
  @Field(() => [Appointment], { nullable: true })
  @OneToMany(() => Appointment, (appointment) => appointment.booking)
  appointments: Appointment[];
}

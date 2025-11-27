import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRole, UserAccountType } from "../utils/enums";

@ObjectType()
@Entity("user")
class User extends BaseEntity {
  @Field()
  @PrimaryColumn({ type: "text" })
  id: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column({ type: "bool" })
  acceptedTermsAndConditions: boolean;

  @Field()
  @Column({ type: "text", nullable: false })
  name: string;

  @Field()
  @Column({ type: "text", nullable: false, unique: true })
  email: string;

  @Field()
  @Column({ type: "bool" })
  emailVerified: boolean;

  @Field()
  @Column({ type: "text", default: UserRole.USER, enum: UserRole })
  role: string;

  @Field()
  @Column({ type: "text", nullable: false, enum: UserAccountType })
  accountType: string; // buyer or seller

  @Field()
  @Column({ type: "text", nullable: false })
  dialCode: string;

  @Field()
  @Column({ type: "text", nullable: false })
  phoneNumber: string;

  @Field({ nullable: true })
  @Column({
    type: "text",
    default: process.env.DEFAULT_PROFILE_PICTURE,
    nullable: true,
  })
  picture?: string;
}

export default User;

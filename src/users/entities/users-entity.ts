import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { config } from "dotenv";

config()

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  username: string

  @Column({ nullable: false })
  surname: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: true })
  refresh_token: string

  @AfterInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, +process.env.SALT_ROUNDS)
  }
}
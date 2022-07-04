import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TempUser {
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

  // @Column({ nullable: true })
  // refresh_token: string
}
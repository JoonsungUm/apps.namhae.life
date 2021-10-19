import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Stores {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  imageUrl: string

  @Column()
  address: string

  @Column()
  phone: string

  @Column({ nullable: true })
  description: string

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  holidays: string[]

  @Column({ default: true })
  isVisible: boolean
}

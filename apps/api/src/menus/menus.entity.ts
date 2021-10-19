import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Menus {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  storeId: string

  @Column()
  name: string

  @Column()
  price: number

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  imageUrl: string

  @Column()
  isLunch: boolean

  @Column()
  isDinner: boolean
}

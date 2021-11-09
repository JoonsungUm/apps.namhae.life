import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ nullable: true })
  storeId: string

  @Column()
  menuId: string

  @Column({ nullable: true })
  userId: string

  @Column({ nullable: true })
  description: string

  @Column()
  isInCart: boolean

  @Column()
  isPaid: boolean

  @Column({ default: 'SELECT_DONE' })
  status: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

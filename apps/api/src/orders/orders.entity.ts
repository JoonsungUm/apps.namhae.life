import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { OrderStatus } from '../graphql'

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

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.SELECT_DONE,
  })
  status: OrderStatus

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

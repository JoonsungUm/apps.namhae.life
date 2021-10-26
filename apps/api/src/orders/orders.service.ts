import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Orders } from './orders.entity'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
  ) {}

  async findAll(): Promise<Orders[]> {
    return await this.orderRepository.find()
  }

  async findByStoreId(storeId: string): Promise<Orders[]> {
    return await this.orderRepository.find({ storeId })
  }

  async findByUserId(userId: string): Promise<Orders[]> {
    return await this.orderRepository.find({ userId })
  }

  async findOne(id: string): Promise<Orders> {
    return await this.orderRepository.findOne(id)
  }

  async create(order: Partial<Orders>): Promise<Orders> {
    return await this.orderRepository.save(order)
  }

  async update(order: Partial<Orders>): Promise<Orders> {
    return await this.orderRepository.save(order)
  }

  async delete(id: string): Promise<Orders> {
    const order = await this.orderRepository.findOne(id)
    await this.orderRepository.delete(id)
    return order
  }
}

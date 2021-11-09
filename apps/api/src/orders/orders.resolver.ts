import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { OrdersService } from './orders.service'
import { Order, OrderCreateInput, OrderStatusBulkUpdateInput, OrderUpdateInput } from '../graphql'

@Resolver('Order')
export class OrdersResolver {
  constructor(private orderService: OrdersService) {}

  @Query()
  async order(@Args('id') id: string) {
    return this.orderService.findOne(id)
  }

  @Query()
  async ordersByStore(@Args('storeId') storeId: string) {
    return this.orderService.findByStoreId(storeId)
  }

  @Query()
  async ordersByUser(@Args('userId') userId: string) {
    return this.orderService.findByUserId(userId)
  }

  @Query()
  async ordersByStatus(@Args('status') status: string) {
    return this.orderService.findByStatus(status)
  }

  @Query()
  async orders() {
    return this.orderService.findAll()
  }

  @Mutation()
  async orderCreate(@Args('orderCreateInput') args: OrderCreateInput): Promise<Order> {
    const createdOrder = await this.orderService.create(args)
    return createdOrder
  }

  @Mutation()
  async orderUpdate(@Args('orderUpdateInput') args: OrderUpdateInput): Promise<Order> {
    const { id, ...rest } = args
    let order = await this.orderService.findOne(id)
    order = {
      ...order,
      ...rest,
    }

    const updatedOrder = await this.orderService.update(order)
    return updatedOrder
  }

  @Mutation()
  async orderDelete(@Args('id') id: string): Promise<Order> {
    const deletedOrder = await this.orderService.delete(id)
    return deletedOrder
  }

  @Mutation()
  async orderStatusBulkUpdate(
    @Args('orderStatusBulkUpdateInput') args: OrderStatusBulkUpdateInput,
  ): Promise<Order[]> {
    const { ids, status } = args
    console.log(ids, status)
    const updatedOrders = await this.orderService.bulkUpdateStatus(ids, status)
    return updatedOrders
  }
}

import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Menus } from '../menus/menus.entity'
import { Order } from '../graphql'
import { MenusService } from '../menus/menus.service'

@Resolver('Order')
export class OrderMenuResolver {
  constructor(private readonly menusService: MenusService) {}

  @ResolveField()
  async menu(@Parent() order: Order & { id: string }): Promise<Menus> {
    return this.menusService.findOne(order.menuId)
  }
}

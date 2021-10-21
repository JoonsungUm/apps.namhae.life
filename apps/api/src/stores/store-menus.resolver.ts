import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Store, Menu } from '../,,/../graphql'
import { MenusService } from '../menus/menus.service'

@Resolver('Store')
export class StoreMenusResolver {
  constructor(private readonly menusService: MenusService) {}

  @ResolveField()
  async menus(@Parent() store: Store & { id: string }): Promise<Menu[]> {
    return this.menusService.findByStoreId(store.id)
  }
}

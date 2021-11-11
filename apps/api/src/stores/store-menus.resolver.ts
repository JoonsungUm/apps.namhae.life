import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Menus } from '../menus/menus.entity'
import { Store } from '../,,/../graphql'
import { MenusService } from '../menus/menus.service'

@Resolver('Store')
export class StoreMenusResolver {
  constructor(private readonly menusService: MenusService) {}

  @ResolveField()
  async menus(@Parent() store: Store & { id: string }): Promise<Menus[]> {
    return this.menusService.findByStoreId(store.id)
  }
}

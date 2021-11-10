import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Stores } from 'src/stores/stores.entity'
import { Menu } from '../graphql'
import { StoresService } from '../stores/stores.service'

@Resolver('Menu')
export class MenuStoreResolver {
  constructor(private readonly storesService: StoresService) {}

  @ResolveField()
  async store(@Parent() menu: Menu & { id: string }): Promise<Stores> {
    return this.storesService.findOne(menu.storeId)
  }
}

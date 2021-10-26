import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { MenusService } from './menus.service'
import { Menu, MenuCreateInput, MenuUpdateInput } from '../graphql'

@Resolver('Menu')
export class MenusResolver {
  constructor(private menusService: MenusService) {}

  @Query()
  async menu(@Args('id') id: string) {
    return this.menusService.findOne(id)
  }

  @Query()
  async menusByStore(@Args('storeId') storeId: string) {
    return this.menusService.findByStoreId(storeId)
  }

  @Query()
  async menus() {
    return this.menusService.findAll()
  }

  @Mutation()
  async menuCreate(@Args('menuCreateInput') args: MenuCreateInput): Promise<Menu> {
    const createdMenu = await this.menusService.create(args)
    return createdMenu
  }

  @Mutation()
  async menuUpdate(@Args('menuUpdateInput') args: MenuUpdateInput): Promise<Menu> {
    const { id, ...rest } = args
    let menu = await this.menusService.findOne(id)
    menu = {
      ...menu,
      ...rest,
    }

    const updatedMenu = await this.menusService.update(menu)
    return updatedMenu
  }

  @Mutation()
  async menuDelete(@Args('id') id: string): Promise<Menu> {
    const deletedMenu = await this.menusService.delete(id)
    return deletedMenu
  }
}

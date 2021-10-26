import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { StoresService } from './stores.service'
import { Holiday, Store, StoreCreateInput, StoreUpdateInput } from '../graphql'
import { Stores } from './stores.entity'

@Resolver('Store')
export class StoresResolver {
  constructor(private storesService: StoresService) {}

  @Query()
  async store(@Args('id') id: string) {
    return this.storesService.findOne(id)
  }

  @Query()
  async stores() {
    return this.storesService.findAll()
  }

  @Mutation()
  async storeCreate(@Args('storeCreateInput') args: StoreCreateInput): Promise<Store> {
    const createdStore = await this.storesService.create(args)
    return convertHolidays(createdStore)
  }

  @Mutation()
  async storeUpdate(@Args('storeUpdateInput') args: StoreUpdateInput): Promise<Store> {
    const { id, ...rest } = args
    let store = await this.storesService.findOne(id)
    store = {
      ...store,
      ...rest,
    }

    const updatedStore = await this.storesService.update(store)
    return convertHolidays(updatedStore)
  }

  @Mutation()
  async storeDelete(@Args('id') id: string): Promise<Store> {
    const deletedStore = await this.storesService.delete(id)
    return convertHolidays(deletedStore)
  }
}

const convertHolidays = (store: Stores): Store => {
  const { holidays } = store
  return {
    ...store,
    holidays: holidays ? (holidays as Holiday[]) : [],
  }
}

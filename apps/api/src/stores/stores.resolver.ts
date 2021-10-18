import { Resolver, Query, Args } from '@nestjs/graphql'
import { StoresService } from './stores.service'

@Resolver('Store')
export class StoresResolver {
  constructor(private storesService: StoresService) {}

  @Query()
  async store(@Args('id') id: number) {
    return this.storesService.findOne(id)
  }

  @Query()
  async stores() {
    return this.storesService.findAll()
  }
}

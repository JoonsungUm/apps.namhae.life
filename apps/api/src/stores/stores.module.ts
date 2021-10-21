import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StoresService } from './stores.service'
import { StoresResolver } from './stores.resolver'
import { StoreMenusResolver } from './store-menus.resolver'
import { Stores } from './stores.entity'
import { MenusModule } from 'src/menus/menus.module'

@Module({
  imports: [TypeOrmModule.forFeature([Stores]), MenusModule],
  providers: [StoresService, StoresResolver, StoreMenusResolver],
})
export class StoresModule {}

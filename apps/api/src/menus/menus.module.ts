import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MenusService } from './menus.service'
import { MenusResolver } from './menus.resolver'
import { Menus } from './menus.entity'
import { StoresModule } from '../stores/stores.module'
import { MenuStoreResolver } from './menu-store.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Menus]), forwardRef(() => StoresModule)],
  providers: [MenusService, MenusResolver, MenuStoreResolver],
  exports: [MenusService],
})
export class MenusModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MenusService } from './menus.service'
import { MenusResolver } from './menus.resolver'
import { Menus } from './menus.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Menus])],
  providers: [MenusService, MenusResolver],
})
export class MenusModule {}

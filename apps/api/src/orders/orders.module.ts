import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrdersService } from './orders.service'
import { OrdersResolver } from './orders.resolver'
import { Orders } from './orders.entity'
import { DateScalar } from '../common/scalars/date.scalar'
import { MenusModule } from '../menus/menus.module'
import { OrderMenuResolver } from './order-menu.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Orders]), MenusModule],
  providers: [OrdersService, OrdersResolver, OrderMenuResolver, DateScalar],
})
export class OrdersModule {}

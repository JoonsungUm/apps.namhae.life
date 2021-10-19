import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StoresService } from './stores.service'
import { StoresResolver } from './stores.resolver'
import { Stores } from './stores.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Stores])],
  providers: [StoresService, StoresResolver],
})
export class StoresModule {}

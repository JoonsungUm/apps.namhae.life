import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { StoresModule } from './stores/stores.module'
import { MenusModule } from './menus/menus.module'
import { OrdersModule } from './orders/orders.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.APP_NAMHAE_LIFE_DB_HOST,
      port: process.env.APP_NAMHAE_LIFE_DB_PORT ? parseInt(process.env.APP_NAMHAE_LIFE_DB_PORT) : 5432,
      username: process.env.APP_NAMHAE_LIFE_DB_USERNAME,
      password: process.env.APP_NAMHAE_LIFE_DB_PASSWORD,
      database: process.env.APP_NAMHAE_LIFE_DB_NAME,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/management/migration/*.js'],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
    StoresModule,
    MenusModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

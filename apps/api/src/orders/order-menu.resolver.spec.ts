import { Test, TestingModule } from '@nestjs/testing'
import { OrderMenuResolver } from './order-menu.resolver'

describe('OrderMenuResolver', () => {
  let resolver: OrderMenuResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderMenuResolver],
    }).compile()

    resolver = module.get<OrderMenuResolver>(OrderMenuResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})

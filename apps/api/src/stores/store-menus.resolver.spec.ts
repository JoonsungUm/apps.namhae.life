import { Test, TestingModule } from '@nestjs/testing'
import { StoreMenusResolver } from './store-menus.resolver'

describe('StoreMenusResolver', () => {
  let resolver: StoreMenusResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreMenusResolver],
    }).compile()

    resolver = module.get<StoreMenusResolver>(StoreMenusResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})

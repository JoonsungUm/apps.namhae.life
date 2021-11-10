import { Test, TestingModule } from '@nestjs/testing'
import { MenuStoreResolver } from './menu-store.resolver'

describe('MenuStoreResolver', () => {
  let resolver: MenuStoreResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuStoreResolver],
    }).compile()

    resolver = module.get<MenuStoreResolver>(MenuStoreResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})

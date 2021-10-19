import { Test, TestingModule } from '@nestjs/testing'
import { MenusResolver } from './menus.resolver'

describe('MenusResolver', () => {
  let resolver: MenusResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenusResolver],
    }).compile()

    resolver = module.get<MenusResolver>(MenusResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})

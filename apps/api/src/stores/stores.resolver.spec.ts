import { Test, TestingModule } from '@nestjs/testing'
import { StoresResolver } from './stores.resolver'

describe('StoresResolver', () => {
  let resolver: StoresResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoresResolver],
    }).compile()

    resolver = module.get<StoresResolver>(StoresResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})

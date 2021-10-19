import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Stores } from './stores.entity'

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Stores)
    private readonly storeRepository: Repository<Stores>,
  ) {}

  async findAll(): Promise<Stores[]> {
    return await this.storeRepository.find()
  }

  async findOne(id: string): Promise<Stores> {
    return await this.storeRepository.findOne(id)
  }

  async create(store: Partial<Stores>): Promise<Stores> {
    return await this.storeRepository.save(store)
  }

  async update(store: Partial<Stores>): Promise<Stores> {
    return await this.storeRepository.save(store)
  }

  async delete(id: string): Promise<Stores> {
    const store = await this.storeRepository.findOne(id)
    await this.storeRepository.delete(id)
    return store
  }
}

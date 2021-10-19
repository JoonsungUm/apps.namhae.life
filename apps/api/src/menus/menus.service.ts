import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Menus } from './menus.entity'

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menus)
    private readonly menuRepository: Repository<Menus>,
  ) {}

  async findAll(): Promise<Menus[]> {
    return await this.menuRepository.find()
  }

  async findByStoreId(storeId: string): Promise<Menus[]> {
    return await this.menuRepository.find({ storeId })
  }

  async findOne(id: string): Promise<Menus> {
    return await this.menuRepository.findOne(id)
  }

  async create(menu: Partial<Menus>): Promise<Menus> {
    return await this.menuRepository.save(menu)
  }

  async update(menu: Partial<Menus>): Promise<Menus> {
    return await this.menuRepository.save(menu)
  }

  async delete(id: string): Promise<Menus> {
    const menu = await this.menuRepository.findOne(id)
    await this.menuRepository.delete(id)
    return menu
  }
}

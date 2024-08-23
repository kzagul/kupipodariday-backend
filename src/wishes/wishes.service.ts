import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  In,
  MoreThan,
} from 'typeorm';

import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async findAll(): Promise<Wish[]> {
    return this.wishRepository.find();
  }

  async findOne(query: any): Promise<Wish> {
    return this.wishRepository.findOne(query);
  }

  findTopWishes() {
    return this.wishRepository.find({
      order: {
        copied: 'DESC',
      },
      where: {
        copied: MoreThan(0),
      },
      take: 10,
    });
  }

  findLastWishes() {
    return this.wishRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }

  async create(wish: Partial<Wish>): Promise<Wish> {
    const newWish = this.wishRepository.create(wish);
    return this.wishRepository.save(newWish);
  }

  async update(id: number, updateData: Partial<Wish>): Promise<Wish> {
    await this.wishRepository.update(id, updateData);
    return this.wishRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.wishRepository.delete(id);
  }
}

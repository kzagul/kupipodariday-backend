import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.wishRepository.find({ relations: ['offers'] });
  }

  async findOne(id: number): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: ['offers'],
    });
    if (!wish) {
      throw new NotFoundException(`Подарок по указанному id ${id} не найден`);
    } else {
      return wish;
    }
  }

  async findLastWishes() {
    const lastWishes = await this.wishRepository.find({
      // take: 40,
      take: 2,
      order: {
        createdAt: 'DESC',
      },
      relations: ['user'],
    });
    return lastWishes;
  }

  async findTopWishes() {
    const TopWishes = await this.wishRepository.find({
      // take: 10,
      take: 2,
      order: {
        copied: 'DESC',
      },
      relations: ['user'],
    });
    return TopWishes;
  }
  // findTopWishes() {
  //   return this.wishRepository.find({
  //     order: {
  //       copied: 'DESC',
  //     },
  //     where: {
  //       copied: MoreThan(0),
  //     },
  //     take: 10,
  //   });
  // }

  // async findLastWishes() {
  //   return await this.wishRepository.find({
  //     take: 40,
  //     order: {
  //       createdAt: 'DESC',
  //     },
  //     relations: ['owner'],
  //   });
  // }

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

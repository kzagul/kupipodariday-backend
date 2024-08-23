import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  async findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find();
  }

  async findOne(query: any): Promise<Wishlist> {
    return this.wishlistRepository.findOne(query);
  }

  async create(wishlist: Partial<Wishlist>): Promise<Wishlist> {
    const newWishlist = this.wishlistRepository.create(wishlist);
    return this.wishlistRepository.save(newWishlist);
  }

  async update(id: number, updateData: Partial<Wishlist>): Promise<Wishlist> {
    await this.wishlistRepository.update(id, updateData);
    return this.wishlistRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.wishlistRepository.delete(id);
  }
}

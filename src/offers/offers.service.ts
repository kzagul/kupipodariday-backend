import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  async create(offer: Partial<Offer>): Promise<Offer> {
    const newOffer = this.offerRepository.create(offer);
    return this.offerRepository.save(newOffer);
  }

  async findOne(query: any): Promise<Offer | null> {
    return this.offerRepository.findOne(query);
  }

  async findAll(query: FindManyOptions<Offer> = {}): Promise<Offer[]> {
    return this.offerRepository.find(query);
  }

  async update(id: number, updateData: Partial<Offer>): Promise<Offer> {
    await this.offerRepository.update(id, updateData);
    return this.offerRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.offerRepository.delete(id);
  }
}

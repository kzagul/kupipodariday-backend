import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, FindOneOptions, FindManyOptions, Like } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  // async findOne(query: any): Promise<User | null> {
  //   return this.userRepository.findOne(query);
  // }

  // async findAll(query: FindManyOptions<User> = {}): Promise<User[]> {
  //   return this.userRepository.find(query);
  // }

  // async findMany(query: string): Promise<User[]> {
  //   return this.userRepository.find({
  //     where: [{ username: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
  //   });
  // }
  async findOne(query: FindOneOptions<User>): Promise<User | null> {
    return this.userRepository.findOne(query);
  }

  async findAll(query: FindManyOptions<User> = {}): Promise<User[]> {
    return this.userRepository.find(query);
  }
  async findMany(query: string): Promise<User[]> {
    return this.userRepository.find({
      where: [{ username: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
    });
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateData);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}

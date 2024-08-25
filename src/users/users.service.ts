import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, FindOneOptions, FindManyOptions, Like } from 'typeorm';
import { User } from './entities/user.entity';
import { HashingService } from '../helpers/hash-service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

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

  async findAll(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async findUser(query: string) {
    const user = await this.userRepository.find({
      where: [{ username: Like(`${query}`) }, { email: Like(`${query}`) }],
    });
    if (!user) {
      throw new NotFoundException(
        `Пользователь по указанному полю ${query} не найден.`,
      );
    }
    return user;
  }

  async findMany(query: string): Promise<User[]> {
    const user = this.userRepository.find({
      where: [{ username: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
    });
    if (!user) {
      throw new NotFoundException(
        `Пользователь по указанному полю ${query} не найден.`,
      );
    }
    return user;
  }

  async findUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (!user) {
      throw new NotFoundException(
        `Пользователь с именем ${username} не найден.`,
      );
    }
    return user;
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateData);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async signup(userDto: CreateUserDto): Promise<User> {
    const existUser = await this.userRepository.findOne({
      where: { email: userDto.email },
    });
    if (existUser) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }
    const { password } = userDto;
    const hashedPassword = await this.hashingService.hashValue(password, 10);
    const user = this.userRepository.create({
      ...userDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }
}

import { Injectable } from '@nestjs/common';
import { registerUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>
  ) {}
  async create(registerUserDto: registerUserDto) {
    const exist=await this.usersRepo.findOne({ where: { email: registerUserDto.email } });
    if(exist) throw new ConflictException('El email ya esta registrado');
    const hashed=await bcrypt.hash(registerUserDto.password, 10);
    const newuser=this.usersRepo.create({
      ...registerUserDto,
      password: hashed
    });
    return this.usersRepo.save(newuser);
  }

  async findByEmail(email: string) {
    return this.usersRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findById(id: number) {
    return this.usersRepo.findOne({ where: { id } });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

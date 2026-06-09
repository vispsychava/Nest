import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class FoodsService {
  constructor(@InjectRepository(Food) private readonly foodRepository: Repository<Food>)
   {}
  async create(createFoodDto: CreateFoodDto) {
    const food = this.foodRepository.create(createFoodDto);
    return this.foodRepository.save(food);
  }

  async findAll() {
    const foods = await this.foodRepository.find();
    return foods;
  }

  async findOne(id: number) {
   const food = await this.foodRepository.findOneBy(
      {id});
    //const food = await this.foodRepository.findOne({where: {id}});
      if (!food) {
  throw new NotFoundException(`No se encontró la comida con el id: ${id} proporcionado`);
}
    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    const food = await this.foodRepository.findOneBy({id});
    if (!food) {
      throw new NotFoundException(`No se encontró la comida con el id: ${id} proporcionado`);
    }
    const updatedFood = this.foodRepository.merge(food, updateFoodDto);
    return this.foodRepository.save(updatedFood);
  }

  async remove(id: number) {
    const food = await this.foodRepository.findOneBy({id});
    if (!food) {
      throw new NotFoundException(`No se encontró la comida con el id: ${id} proporcionado`);
    }
    await this.foodRepository.delete(id);
    return { message: `Comida con id ${id} eliminada exitosamente` };
  }
}

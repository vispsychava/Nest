import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFoodDto {
    @IsNotEmpty()
    @IsString()
    name!: string;
    @IsNotEmpty()
    @IsString()
    description!: string;
    @IsNotEmpty()
    @IsNumber()
    price!: number;
    @IsNotEmpty()
    @IsString()
    img!: string;
    @IsNotEmpty()
    @IsString()
    category!: string;
}

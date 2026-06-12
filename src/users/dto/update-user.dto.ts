import { PartialType } from '@nestjs/mapped-types';
import { registerUserDto } from './register-user.dto';

export class UpdateUserDto extends PartialType(registerUserDto) {}

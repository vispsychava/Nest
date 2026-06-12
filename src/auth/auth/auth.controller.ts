import { Controller } from '@nestjs/common';
import { LoginDto } from 'src/users/dto/login.dto';
import { AuthService } from './auth.service';
import { Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
     @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}

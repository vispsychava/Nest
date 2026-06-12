import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/users/dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
   async login(logindto: LoginDto) {
    const user = await this.usersService.findByEmail(logindto.email);

    if (!user) {
        throw new UnauthorizedException('Credenciales inválidas');
    }

    const match = await bcrypt.compare(
        logindto.password,
        user.password
    );

    if (!match) {
        throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
        sub: user.id,
        email: user.email,
    };

    return {
        access_token: this.jwtService.sign(payload),
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
    };
}
}

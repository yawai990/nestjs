import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { hashService } from 'src/helpers/hash';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private hashHelper: hashService,
  ) {}

  async signUp(newUser: Prisma.user_tblCreateInput) {
    const newuser = await this.userService.createOne(newUser);

    return newuser;
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (!user)
      throw new NotFoundException({
        message: 'your name is not registered yet',
      });
    if (!this.hashHelper.ComparePassword(pass, user.password)) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.sign(user);

    return {
      access_token: token,
    };
  }
}

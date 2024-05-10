import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Prisma } from '@prisma/client';
import { ZodPipe } from 'src/exception/ZodPipe';
import { userSignUpSchema } from 'src/schema/user/user.schema';

type singDTOProps = {
  username: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body(new ZodPipe(userSignUpSchema)) signInDTO: singDTOProps) {
    return this.authService.signIn(signInDTO.username, signInDTO.password);
  }

  @Post('signup')
  async signUp(
    @Body(new ZodPipe(userSignUpSchema)) singUpDTO: Prisma.user_tblCreateInput,
  ) {
    return this.authService.signUp(singUpDTO);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

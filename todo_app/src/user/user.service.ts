import { HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { hashService } from 'src/helpers/hash';

export type User = any;

@Injectable()
export class UserService {
  constructor(
    private databaseservice: DatabaseService,
    private hashHelper: hashService,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.databaseservice.user_tbl.findFirst({
      where: {
        username,
      },
    });
  }

  async createOne(newUser: Prisma.user_tblCreateInput) {
    const userExit = await this.findOne(newUser.username);

    if (userExit)
      throw new NotAcceptableException({
        statusCode: HttpStatus.FOUND,
        message: 'user already exist',
      });

    const hashedPassword = await this.hashHelper.hashPassword(newUser.password);
    return this.databaseservice.user_tbl.create({
      data: {
        ...newUser,
        password: hashedPassword,
      },
    });
  }
}

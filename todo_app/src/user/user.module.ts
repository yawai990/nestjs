import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseService } from 'src/database/database.service';
import { hashService } from 'src/helpers/hash';

@Module({
  exports: [UserService],
  providers: [UserService, DatabaseService, hashService],
})
export class UserModule {}

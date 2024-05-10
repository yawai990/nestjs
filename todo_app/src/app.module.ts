import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { DatabaseService } from './database/database.service';
import { hashService } from './helpers/hash';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [AuthModule, UserModule, TodoModule],
  controllers: [AppController],
  providers: [AppService, UserService, DatabaseService, hashService],
})
export class AppModule {}

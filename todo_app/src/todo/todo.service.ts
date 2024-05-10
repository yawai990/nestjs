import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TodoService {
  constructor(private databaseservice: DatabaseService) {}

  async create(createTodoDto: Prisma.todo_tblCreateInput) {
    return await this.databaseservice.todo_tbl.create({
      data: createTodoDto,
    });
  }

  async findAll(id: number) {
    return await this.databaseservice.todo_tbl.findMany({
      where: {
        userId: id,
      },
    });
  }

  async findOne(id: number) {
    return await this.databaseservice.todo_tbl.findFirst({
      where: { id },
    });
  }

  async update(id: number, userId: number) {
    const todo = await this.findOne(id);
    if (!todo) throw new NotFoundException();
    if (todo.userId !== userId) throw new UnauthorizedException();
    return await this.databaseservice.todo_tbl.update({
      data: {
        complete: !todo.complete,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number, userId: number) {
    const todo = await this.findOne(id);
    if (!todo) throw new NotFoundException();
    if (todo.userId !== userId) throw new UnauthorizedException();
    return this.databaseservice.todo_tbl.delete({
      where: { id },
    });
  }
}

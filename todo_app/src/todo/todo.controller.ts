import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Patch,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { todoCreateSchema, todoParamsSchema } from 'src/schema/todo.schema';
import { ZodPipe } from 'src/exception/ZodPipe';

@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body(new ZodPipe(todoCreateSchema))
    createTodoDto,
  ) {
    return this.todoService.create({
      ...createTodoDto,
      userId: (req as any).user.id,
    });
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.todoService.findAll((req as any).user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const { error, data } = todoParamsSchema.safeParse({
      id: parseInt(id),
    });
    if (error)
      throw new BadRequestException({
        message: 'id is required to delete',
        error: error.issues,
      });
    return this.todoService.findOne(+data.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req: Request) {
    const { error, data } = todoParamsSchema.safeParse({
      id: parseInt(id),
    });
    if (error)
      throw new BadRequestException({
        message: 'id is required to delete',
        error: error.issues,
      });
    return this.todoService.update(+data.id, (req as any).user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: Request) {
    const { error, data } = todoParamsSchema.safeParse({
      id: parseInt(id),
    });
    if (error)
      throw new BadRequestException({
        message: 'id is required to delete',
        error: error.issues,
      });

    return this.todoService.remove(+data.id, (req as any).user.id);
  }
}

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodValidation<T extends ZodError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const resp = ctx.getResponse();

    return resp.status(HttpStatus.BAD_REQUEST).json({
      message: exception.errors[0].message,
      error: JSON.parse(exception.message),
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

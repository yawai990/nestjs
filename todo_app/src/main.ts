import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidation } from './exception/Validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ZodValidation());
  await app.listen(3000);
}
bootstrap();

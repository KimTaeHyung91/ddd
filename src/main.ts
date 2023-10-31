import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { BaseExceptionFilter } from './common/filter/base-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new BaseExceptionFilter(app.get(HttpAdapterHost)));

  await app.listen(3000);
}

bootstrap().catch((error) => console.error(error));

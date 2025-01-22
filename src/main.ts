import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GLOBAL_API_PREFIX } from './config/contants/contants';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
      validationError: { target: false },
      whitelist: true,
    }),
  );
  app.setGlobalPrefix(GLOBAL_API_PREFIX);
  app.enableCors();
  await app.listen(process.env.APP_PORT, () => {
    Logger.log(
      `Listening at http://localhost:${process.env.APP_PORT}/${GLOBAL_API_PREFIX}`,
    );
  });
}
void bootstrap();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { setHeadersMiddleware } from './middleware/set-headers.middleware';

async function bootstrap() {


  const app = await NestFactory.create<NestExpressApplication>( AppModule );
  app.enableCors();


  if ( process.env.NODE_ENV === 'development' ) {
    app.use(setHeadersMiddleware);
  }
  


  if ( process.env.NODE_ENV === 'production' ) {
    app.useStaticAssets(join(__dirname, '../../', 'weduc'));
  }


  await app.listen(process.env.PORT || 3000);

}

bootstrap();

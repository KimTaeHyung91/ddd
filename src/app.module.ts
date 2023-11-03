import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/db-config';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { FlushMode, LoadStrategy } from '@mikro-orm/core';
import { AopModule } from '@toss/nestjs-aop';
import { TransactionalModule } from './common/transactional/transactional.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(dbConfig)],
      useFactory: (config: ConfigService) => {
        return {
          host: config.get('db.host'),
          port: config.get('db.port'),
          user: config.get('db.user'),
          password: config.get('db.password'),
          dbName: config.get('db.database'),
          schema: config.get('db.schema'),
          entities: ['dist/**/*.entity.js'],
          entitiesTs: ['src/**/*.entity.ts'],
          registerRequestContext: false,
          driver: PostgreSqlDriver,
          flushMode: FlushMode.COMMIT,
          loadStrategy: LoadStrategy.JOINED,
          debug: true,
        };
      },
      inject: [ConfigService],
    }),
    AopModule,
    TransactionalModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}

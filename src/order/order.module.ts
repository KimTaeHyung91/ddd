import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrderEntity } from './domain/order/order.entity';
import { IOrderWriter } from './domain/order/order-writer.interface';
import { OrderWriterImpl } from './infrastructure/order-writer.impl';
import { IOrderService } from './domain/order/order-service.interface';
import { OrderServiceImpl } from './domain/order/order-service.impl';
import { OrderFacade } from './application/order.facade';
import { OrderApiController } from './interface/order-api.controller';

@Module({
  imports: [MikroOrmModule.forFeature([OrderEntity])],
  controllers: [OrderApiController],
  providers: [
    OrderFacade,
    { provide: IOrderWriter, useClass: OrderWriterImpl },
    { provide: IOrderService, useClass: OrderServiceImpl },
  ],
})
export class OrderModule {}

import { Global, Module } from '@nestjs/common';
import { TransactionalDecorator } from './transactional.decorator';

@Global()
@Module({
  providers: [TransactionalDecorator],
})
export class TransactionalModule {}

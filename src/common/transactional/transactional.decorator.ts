import { Aspect, LazyDecorator, WrapParams } from '@toss/nestjs-aop';
import { TRANSACTIONAL_DECORATOR } from './transactional';
import { EntityManager } from '@mikro-orm/core';

@Aspect(TRANSACTIONAL_DECORATOR)
export class TransactionalDecorator implements LazyDecorator<any> {
  constructor(private readonly em: EntityManager) {}

  wrap({ method }: WrapParams<any, unknown>): any {
    return async (...args: any) =>
      await this.em.transactional(async () => await method(...args));
  }
}

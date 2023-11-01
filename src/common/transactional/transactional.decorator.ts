import { Aspect, LazyDecorator, WrapParams } from '@toss/nestjs-aop';
import { TRANSACTIONAL_DECORATOR } from './transactional';
import { EntityManager } from '@mikro-orm/core';

@Aspect(TRANSACTIONAL_DECORATOR)
export class TransactionalDecorator implements LazyDecorator<any> {
  constructor(private readonly em: EntityManager) {}

  async wrap({
    method,
  }: WrapParams<(...args: any[]) => Promise<void>, unknown>): Promise<any> {
    await method();
    return async () => await this.em.flush();
  }
}

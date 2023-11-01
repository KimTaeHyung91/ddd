import { createDecorator } from '@toss/nestjs-aop';

export const TRANSACTIONAL_DECORATOR = Symbol('TRANSACTIONAL_DECORATOR');
export const Transactional = () => {
  return createDecorator(TRANSACTIONAL_DECORATOR);
};

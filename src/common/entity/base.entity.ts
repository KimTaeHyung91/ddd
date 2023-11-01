import { entries } from 'lodash';
import { Entity, Property } from '@mikro-orm/core';

export type Mutable<T> = {
  -readonly [P in keyof T]?: T[P];
};

@Entity({ abstract: true })
export abstract class BaseEntity<T> {
  @Property({ type: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz' })
  updatedAt: Date = new Date();

  mutable(property: Mutable<T>) {
    for (const [key, value] of entries(property)) {
      (this as any)[key] = value;
    }
  }
}

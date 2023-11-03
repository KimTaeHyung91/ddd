import { Test } from '@nestjs/testing';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { getOnlyTestMikroOrmModule } from './getOnlyTestMikroOrmModule';
import { OrderEntity } from '../src/order/domain/order/order.entity';
import { MikroORM } from '@mikro-orm/core';
import { DeliveryFragment } from '../src/order/domain/order/fragment/delivery.fragment';

jest.setTimeout(1_000 * 60 * 10);

describe('SchemaGenerator', () => {
  let dbContainer: StartedPostgreSqlContainer;
  let orm: MikroORM;

  beforeAll(async () => {
    dbContainer = await new PostgreSqlContainer().start();

    const module = await Test.createTestingModule({
      imports: [
        getOnlyTestMikroOrmModule(dbContainer, [OrderEntity, DeliveryFragment]),
      ],
    }).compile();

    orm = module.get(MikroORM);

    await orm.getSchemaGenerator().createSchema();
  });

  it('should be defined - orm', async () => {
    expect(orm).toBeDefined();
  });

  afterAll(async () => {
    await orm.getSchemaGenerator().dropSchema();
    await orm.close();
    await dbContainer.stop({ remove: true, removeVolumes: true });
  });
});

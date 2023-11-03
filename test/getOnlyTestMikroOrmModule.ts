import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EntityClass, LoadStrategy } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export function getOnlyTestMikroOrmModule(
  dbContainer: StartedPostgreSqlContainer,
  entity: EntityClass<any>[],
) {
  return MikroOrmModule.forRoot({
    host: dbContainer.getHost(),
    user: dbContainer.getUsername(),
    password: dbContainer.getPassword(),
    dbName: dbContainer.getDatabase(),
    port: dbContainer.getPort(),
    entities: entity,
    entitiesTs: entity,
    allowGlobalContext: true,
    debug: true,
    driver: PostgreSqlDriver,
    loadStrategy: LoadStrategy.JOINED,
  });
}

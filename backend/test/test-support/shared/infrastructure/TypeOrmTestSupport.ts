import { DatabaseTestSupport } from './DatabaseTestSupport';
import { connectToPostgreSql } from '../../../../src/shared/infrastructure/repository/connectToPostgreSql';
import { getConnection } from 'typeorm';

export const TypeOrmTestSupport: DatabaseTestSupport = {
  async openConnection(): Promise<void> {
    await connectToPostgreSql().then();
  },
  async closeConnection(): Promise<void> {
    const connection = await getConnection();
    if (connection.isConnected) {
      await connection.close();
    }
  },
  async clearDatabase(): Promise<void> {
    const entities = getConnection().entityMetadatas;
    for (const entity of entities) {
      const repository = await getConnection().getRepository(entity.name);
      await repository.clear();
    }
  },
};

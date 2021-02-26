import { DatabaseTestSupport } from './DatabaseTestSupport';
import { connectToPostgreSql } from '../../../../src/shared/infrastructure/repository/connectToPostgreSql';
import { getConnection } from 'typeorm';

export const InMemoryTestSupport: DatabaseTestSupport = {
  openConnection(): Promise<void> {
    return Promise.resolve();
  },
  closeConnection(): Promise<void> {
    return Promise.resolve();
  },
  async clearDatabase(): Promise<void> {
    return Promise.resolve();
  },
};

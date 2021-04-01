import { DatabaseTestSupport } from './DatabaseTestSupport';

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

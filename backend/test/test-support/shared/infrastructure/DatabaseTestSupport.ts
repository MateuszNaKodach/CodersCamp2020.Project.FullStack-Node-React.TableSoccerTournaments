export type DatabaseTestSupport = {
  openConnection(): Promise<void>;
  closeConnection(): Promise<void>;
  clearDatabase(): Promise<void>;
};

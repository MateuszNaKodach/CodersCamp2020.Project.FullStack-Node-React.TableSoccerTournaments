export class OptimisticLockingException extends Error {
  constructor(expectedVersion: number) {
    super(`Optimistic locking exception! Expected version: ${expectedVersion}.`);
  }
}

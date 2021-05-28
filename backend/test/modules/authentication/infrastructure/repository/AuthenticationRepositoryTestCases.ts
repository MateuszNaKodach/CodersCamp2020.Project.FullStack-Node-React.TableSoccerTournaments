import { AuthenticationRepository } from '../../../../../src/modules/authentication/core/application/AuthenticationRepository';
import { DatabaseTestSupport } from '../../../../test-support/shared/infrastructure/DatabaseTestSupport';
import { EntityIdGenerator } from '../../../../../src/shared/core/application/EntityIdGenerator';
import { UuidEntityIdGenerator } from '../../../../../src/shared/infrastructure/core/application/UuidEntityIdGenerator';
import { UserAccount } from '../../../../../src/modules/authentication/core/domain/UserAccount';

export function AuthenticationRepositoryTestCases(props: {
  name: string;
  repositoryFactory: () => AuthenticationRepository;
  databaseTestSupport: DatabaseTestSupport;
}): void {
  return describe(props.name, () => {
    const entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator();
    let repository: AuthenticationRepository;

    beforeAll(async () => {
      await props.databaseTestSupport.openConnection();
      repository = props.repositoryFactory();
    });
    afterEach(async () => await props.databaseTestSupport.clearDatabase());
    afterAll(async () => await props.databaseTestSupport.closeConnection());

    test('findById returns undefined when nothing was saved', async () => {
      const testId = entityIdGenerator.generate();
      expect(await repository.findById(testId)).toBeUndefined();
    });

    test('findByEmail returns undefined when nothing was saved', async () => {
      const testEmail = 'testEmail';
      expect(await repository.findByEmail(testEmail)).toBeUndefined();
    });

    test('findById returns userAccount when such id exists in database', async () => {
      const testId = entityIdGenerator.generate();
      const testEmail = 'testEmail';
      const userAccount1 = new UserAccount({
        userId: testId,
        email: testEmail,
        password: 'testPassword',
      });
      const userAccount2 = new UserAccount({
        userId: 'id1',
        email: 'email1',
        password: undefined,
      });

      await repository.save(userAccount1);
      await repository.save(userAccount2);

      expect(await repository.findById(testId)).toStrictEqual(userAccount1);
    });

    test('findByEmail returns userAccount when such email exists in database', async () => {
      const testId = entityIdGenerator.generate();
      const testEmail = 'testEmail';
      const userAccount1 = new UserAccount({
        userId: testId,
        email: testEmail,
        password: 'testPassword',
      });
      const userAccount2 = new UserAccount({
        userId: 'id1',
        email: 'email1',
        password: undefined,
      });

      //TODO here we already have 2 users accounts in database, so
      // afterEach(async () => await props.databaseTestSupport.clearDatabase());
      // doesn't work - need t obe implemented
      await repository.save(userAccount1);
      await repository.save(userAccount2);

      expect(await repository.findByEmail(testEmail)).toStrictEqual(userAccount1);
    });

    //TODO add test for sav()
  });
}

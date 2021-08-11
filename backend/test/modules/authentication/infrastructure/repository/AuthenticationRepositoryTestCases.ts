import { AuthenticationRepository } from '../../../../../src/modules/authentication/core/application/AuthenticationRepository';
import { DatabaseTestSupport } from '../../../../test-support/shared/infrastructure/DatabaseTestSupport';
import { EntityIdGenerator } from '../../../../../src/shared/core/application/EntityIdGenerator';
import { UuidEntityIdGenerator } from '../../../../../src/shared/infrastructure/core/application/UuidEntityIdGenerator';
import { UserAccount } from '../../../../../src/modules/authentication/core/domain/UserAccount';
import { UserId } from '../../../../../src/modules/authentication/core/domain/UserId';
import { Email } from '../../../../../src/modules/authentication/core/domain/Email';
import { Password } from '../../../../../src/modules/authentication/core/domain/Password';

export function AuthenticationRepositoryTestCases(props: {
  name: string;
  repositoryFactory: () => AuthenticationRepository;
  databaseTestSupport: DatabaseTestSupport;
}): void {
  return describe(props.name, () => {
    const entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator();
    let repository: AuthenticationRepository;

    beforeEach(async () => {
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
      const testEmail = 'testEmail@gmail.com';
      const userAccount1 = new UserAccount({
        userId: UserId.from(testId),
        email: Email.from(testEmail),
        password: Password.from('testPassword'),
      });
      const userAccount2 = new UserAccount({
        userId: UserId.from('id1'),
        email: Email.from('testEmail555@gmail.com'),
        password: Password.from('testPassword'),
      });

      await repository.save(userAccount1);
      await repository.save(userAccount2);

      expect(await repository.findById(testId)).toStrictEqual(userAccount1);
      expect(await repository.findById('id1')).toStrictEqual(userAccount2);
    });

    test('findByEmail returns userAccount when such email exists in database', async () => {
      const testId = entityIdGenerator.generate();
      const testEmail = 'testEmail@gmail.com';
      const userAccount1 = new UserAccount({
        userId: UserId.from(testId),
        email: Email.from(testEmail),
        password: Password.from('testPassword'),
      });
      const userAccount2 = new UserAccount({
        userId: UserId.from('id1'),
        email: Email.from('testEmail555@gmail.com'),
        password: Password.from('testPassword'),
      });

      await repository.save(userAccount1);
      await repository.save(userAccount2);

      expect(await repository.findByEmail(testEmail)).toStrictEqual(userAccount1);
      expect(await repository.findByEmail('testEmail555@gmail.com')).toStrictEqual(userAccount2);
    });
  });
}

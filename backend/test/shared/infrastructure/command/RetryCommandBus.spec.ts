import { CommandResult } from '../../../../src/shared/core/application/command/CommandResult';
import { RetryCommandBus } from '../../../../src/shared/infrastructure/core/application/command/RetryCommandBus';
import { StartTournament } from './CommandsTestFixtures';

describe('RetryCommandBus', function () {
  it('retrying max number of retires', async () => {
    const alwaysFailCommandBus = {
      execute: jest.fn().mockImplementation(() => CommandResult.failureDueTo(new Error('Mock error'))),
      registerHandler: jest.fn(),
    };
    const commandBus = new RetryCommandBus(alwaysFailCommandBus, 3);

    const startTournament = new StartTournament({ tournamentId: 'SampleId' });
    await commandBus.execute(startTournament);

    expect(alwaysFailCommandBus.execute).toBeCalledTimes(4);
  });

  it('when no retires, then execute command only once', async () => {
    const alwaysFailCommandBus = {
      execute: jest.fn().mockImplementation(() => CommandResult.failureDueTo(new Error('Mock error'))),
      registerHandler: jest.fn(),
    };
    const commandBus = new RetryCommandBus(alwaysFailCommandBus, 0);

    const startTournament = new StartTournament({ tournamentId: 'SampleId' });
    await commandBus.execute(startTournament);

    expect(alwaysFailCommandBus.execute).toBeCalledTimes(1);
  });
});

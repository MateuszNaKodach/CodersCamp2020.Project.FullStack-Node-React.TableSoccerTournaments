import { CommandResult } from '../../../../src/shared/core/application/command/CommandResult';
import { RetryCommandBus } from '../../../../src/shared/infrastructure/core/application/command/RetryCommandBus';
import { StartTournament } from './CommandsTestFixtures';
import {CommandBusMock} from "../../../test-support/shared/core/CommandBusMock";
import Failure = CommandResult.Failure;
import Success = CommandResult.Success;

describe('RetryCommandBus', function () {
  it('when every command fails, then should retried max number of retires', async () => {
    const alwaysFailCommandBus = CommandBusMock(CommandResult.failureDueTo(new Error('Mock error')));
    const commandBus = new RetryCommandBus(alwaysFailCommandBus, 3);

    const startTournament = new StartTournament({ tournamentId: 'SampleId' });
    const result = await commandBus.execute(startTournament);

    expect(alwaysFailCommandBus.executeCalls).toBeCalledTimes(4);
    expect(result.isSuccess()).toBeFalse();
    expect((result as Failure).reason).toStrictEqual(new Error("Mock error"));
  });

  it('when every command succeed, then should not execute retries', async () => {
    const alwaysSucceedCommandBus = CommandBusMock(CommandResult.success("SuccessValue"));
    const commandBus = new RetryCommandBus(alwaysSucceedCommandBus, 100);

    const startTournament = new StartTournament({ tournamentId: 'SampleId' });
    const result = await commandBus.execute(startTournament);

    expect(alwaysSucceedCommandBus.executeCalls).toBeCalledTimes(1);
    expect(result.isSuccess()).toBeTrue();
    expect((result as Success).value).toStrictEqual("SuccessValue");
  });

  it('when no retires, then execute command only once', async () => {
    const alwaysFailCommandBus = CommandBusMock(CommandResult.failureDueTo(new Error('Mock error')));
    const commandBus = new RetryCommandBus(alwaysFailCommandBus, 0);

    const startTournament = new StartTournament({ tournamentId: 'SampleId' });
    const result = await commandBus.execute(startTournament);

    expect(alwaysFailCommandBus.executeCalls).toBeCalledTimes(1);
    expect(result.isSuccess()).toBeFalse();
    expect((result as Failure).reason).toStrictEqual(new Error("Mock error"));
  });
});

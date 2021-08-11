import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { SetPassword } from './SetPassword';
import { AuthenticationRepository } from '../AuthenticationRepository';
import { setPasswordForUserAccount } from '../../domain/UserAccount';
import { IPasswordEncryptor } from '../../../infrastructure/password/IPasswordEncryptor';

export class SetPasswordCommandHandler implements CommandHandler<SetPassword> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: AuthenticationRepository,
    private readonly passwordEncryptor: IPasswordEncryptor,
  ) {}

  async execute(command: SetPassword): Promise<CommandResult> {
    const userAccount = await this.repository.findById(command.userId);
    const hashedPassword = await this.passwordEncryptor.encryptPassword(command.password);
    const { state, events } = await setPasswordForUserAccount(userAccount, command, hashedPassword, this.currentTimeProvider());
    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}

import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { AuthenticationRepository } from '../AuthenticationRepository';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { AuthenticateUser } from './AuthenticateUser';
import { authenticateUser } from '../../domain/UserAccount';

export class AuthencticateUserCommandHandler implements CommandHandler<AuthenticateUser> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: AuthenticationRepository,
  ) {}

  async execute(command: AuthenticateUser): Promise<CommandResult> {
    const userAccount = await this.repository.findByEmail(command.email);
    const { state, events } = authenticateUser(userAccount, command, this.currentTimeProvider());
    this.eventPublisher.publishAll(events);
    return CommandResult.success(state);
  }
}

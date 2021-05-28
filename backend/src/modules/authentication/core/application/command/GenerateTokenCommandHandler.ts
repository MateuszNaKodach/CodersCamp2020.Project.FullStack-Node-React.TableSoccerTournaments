import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { AuthenticationRepository } from '../AuthenticationRepository';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { GenerateToken } from './GenerateToken';
import { authenticateUser } from '../../domain/UserAccount';

export class GenerateTokenCommandHandler implements CommandHandler<GenerateToken> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: AuthenticationRepository,
  ) {}

  async execute(command: GenerateToken): Promise<CommandResult> {
    const userAccount = await this.repository.findByEmail(command.email);
    const { state, events } = await authenticateUser(userAccount, command, this.currentTimeProvider());
    this.eventPublisher.publishAll(events);
    return CommandResult.success(state);
  }
}

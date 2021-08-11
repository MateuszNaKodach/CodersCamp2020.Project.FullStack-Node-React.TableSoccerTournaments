import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { AuthenticationRepository } from '../AuthenticationRepository';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { GenerateToken } from './GenerateToken';
import { authenticateUser } from '../../domain/UserAccount';
import { ITokenGenerator } from '../../../infrastructure/token/ITokenGenerator';
import { IPasswordEncryptor } from '../../../infrastructure/password/IPasswordEncryptor';

export class GenerateTokenCommandHandler implements CommandHandler<GenerateToken> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: AuthenticationRepository,
    private readonly tokenGenerator: ITokenGenerator,
    private readonly passwordEncryptor: IPasswordEncryptor,
  ) {}

  async execute(command: GenerateToken): Promise<CommandResult> {
    const userAccount = await this.repository.findByEmail(command.email);
    let isPasswordCorrect = false;
    let token = '';
    if (userAccount) {
      isPasswordCorrect = await this.passwordEncryptor.comparePasswords(command.password, userAccount.password.raw);
      token = this.tokenGenerator.generateToken(command.email, userAccount.userId.raw);
    }
    const { state, events } = await authenticateUser(userAccount, command, isPasswordCorrect, token, this.currentTimeProvider());
    this.eventPublisher.publishAll(events);
    return CommandResult.success(state);
  }
}

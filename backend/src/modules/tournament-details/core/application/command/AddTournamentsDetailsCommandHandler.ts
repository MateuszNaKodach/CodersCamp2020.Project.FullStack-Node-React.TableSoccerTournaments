import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { AddTournamentDetails } from './AddTournamentDetails';
import { addTournamentDetails } from '../../domain/TournamentDetails';
import { TournamentDetailsRepository } from '../TournamentDetailsRepository';

export class AddTournamentsDetailsCommandHandler implements CommandHandler<AddTournamentDetails> {
  constructor(private readonly repository: TournamentDetailsRepository) {}

  async execute(command: AddTournamentDetails): Promise<CommandResult> {
    const state = addTournamentDetails(command);

    await this.repository.save(state);
    return CommandResult.success();
  }
}

export class TournamentTeamId {
  private readonly TYPE = 'TeamId';

  private constructor(readonly raw: string) {}

  static from(teamId: string): TournamentTeamId {
    if (teamId.length <= 0) {
      throw new Error('Id cannot be empty!');
    }
    return new TournamentTeamId(teamId);
  }
}

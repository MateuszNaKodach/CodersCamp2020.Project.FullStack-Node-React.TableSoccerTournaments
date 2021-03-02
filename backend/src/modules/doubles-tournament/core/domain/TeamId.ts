export class TeamId {
  private readonly TYPE = 'TeamId';

  private constructor(readonly raw: string) {}

  static from(teamId: string): TeamId {
    if (teamId.length <= 0) {
      throw new Error('TournamentTeamId cannot be empty!');
    }
    return new TeamId(teamId);
  }
}

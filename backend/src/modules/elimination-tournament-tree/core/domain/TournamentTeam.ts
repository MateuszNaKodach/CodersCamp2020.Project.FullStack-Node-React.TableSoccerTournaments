import { TournamentTeamId } from './TournamentTeamId';

export class TournamentTeam {
    readonly teamId: TournamentTeamId;

    constructor(props: { teamId: TournamentTeamId; firstTeamPlayer: string; secondTeamPlayer: string }) {
        this.teamId = props.teamId;
    }
}

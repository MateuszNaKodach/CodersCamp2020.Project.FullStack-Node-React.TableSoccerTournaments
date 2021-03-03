import { TournamentTeamId } from './TournamentTeamId';

export class TournamentTeam {
    readonly teamId: TournamentTeamId;

    constructor(props: { teamId: TournamentTeamId;  }) {
        this.teamId = props.teamId;

    }
}

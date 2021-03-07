export class MatchHasEnded {
    readonly occurredAt: Date;
    readonly matchId: string;
    readonly winner: string;
    readonly looser: string | undefined;


    constructor(props: { occurredAt: Date, matchId: string, winner: string, looser: string | undefined }) {
        this.occurredAt = props.occurredAt;
        this.matchId = props.matchId;
        this.winner = props.winner;
        this.looser = props.looser;
    }
}
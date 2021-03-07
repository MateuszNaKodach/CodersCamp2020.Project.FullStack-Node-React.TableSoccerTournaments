export class EndMatch {
    readonly matchId: string;
    readonly winner: string;


    constructor(props: {matchId: string, winner: string }) {
        this.matchId = props.matchId;
        this.winner = props.winner;
    }
}
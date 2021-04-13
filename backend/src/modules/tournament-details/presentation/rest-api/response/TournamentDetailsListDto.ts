import {TournamentDetailsDto} from "./TournamentDetailsDto";

export class TournamentDetailsListDto {
    readonly items: TournamentDetailsDto[];

    constructor(items: TournamentDetailsDto[]) {
        this.items = items;
    }
}

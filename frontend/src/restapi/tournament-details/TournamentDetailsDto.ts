export type TournamentDetailsDto = {
  readonly tournamentId: string;
  readonly tournamentName: string;
};

export type TournamentDetailsListDto = {
  readonly items: TournamentDetailsDto[];
};

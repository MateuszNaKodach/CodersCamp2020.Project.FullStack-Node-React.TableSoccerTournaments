export type MatchesListDto = {
  readonly tournamentId: string;
  readonly queue: [
    {
      readonly matchNumber: number;
      readonly team1Id: string | undefined;
      readonly team12d: string | undefined;
      readonly tableNumber: number | undefined;
      readonly started: boolean;
    }
  ];
};

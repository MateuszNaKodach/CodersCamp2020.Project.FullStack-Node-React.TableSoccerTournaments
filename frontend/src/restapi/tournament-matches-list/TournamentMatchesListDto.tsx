export type TournamentMatchesListDto = {
   readonly tournamentId: string;
   readonly queue: [
      {
         readonly matchNumber: number;
         readonly team1Id: string | undefined;
         readonly team2Id: string | undefined;
         readonly tableNumber: number | undefined;
         readonly status: 'enqueued' | 'started' | 'ended';
      }
   ];
};

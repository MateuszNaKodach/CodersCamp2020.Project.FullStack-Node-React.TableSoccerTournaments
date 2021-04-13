import {MatchStatus} from "../../atoms/MatchStatus";

export type MatchListItem = {
   onClickTeam: (matchId: string, teamName: string) => void
   matchNumber: number | undefined,
   matchId: string | undefined,
   level: number | undefined,
   winnerId: string | undefined
   matchStatus: MatchStatus
   team1: {
      readonly player1: string | undefined;
      readonly player2: string | undefined;
      readonly teamId: string | undefined;
   },
   team2: {
      readonly player1: string | undefined;
      readonly player2: string | undefined;
      readonly teamId: string | undefined;
   }
};
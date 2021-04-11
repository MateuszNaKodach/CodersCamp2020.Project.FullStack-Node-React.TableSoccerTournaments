import {MatchStatus} from "../../atoms/MatchStatus";

export type MatchListItem = {
   onClickTeam: () => void,
   matchNumber: number | undefined,
   level: number | undefined,
   matchStatus: MatchStatus
   team1: {
      readonly player1: string | undefined;
      readonly player2: string | undefined;
      readonly teamId: number | string | undefined;
   },
   team2: {
      readonly player1: string | undefined;
      readonly player2: string | undefined;
      readonly teamId: string | undefined;
   }
};
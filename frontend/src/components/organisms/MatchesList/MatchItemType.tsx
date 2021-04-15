import {MatchStatusTexts} from "../../atoms/constants/MatchStatusTexts";

export type MatchItemType = {
   readonly  level: number | undefined,
   readonly  matchId: string | undefined,
   readonly  matchNumber: number | undefined,
   readonly  matchStatus: MatchStatusTexts
   readonly  onClickTeam: (matchId: string, teamName: string) => void
   readonly  tableNumber: number | undefined;
   readonly  winnerId: string | undefined
   team1: {
      firstPlayerName: string | undefined;
      secondPlayerName: string | undefined;
      readonly teamId: string | undefined;
   },
   team2: {
      firstPlayerName: string | undefined;
      secondPlayerName: string | undefined;
      readonly teamId: string | undefined;
   }
};
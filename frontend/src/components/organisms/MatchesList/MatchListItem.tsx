import {MatchStatus} from "../../atoms/MatchStatus";

export type MatchListItem = {
   onClickTeam: () => void,
   matchNumber: number | undefined,
   level: number | undefined,
   matchStatus: MatchStatus
   team1: {
       playerName1: string | undefined;
       playerName2: string | undefined;
       teamId: number | string | undefined;
   },
   team2: {
       playerName1: string | undefined;
       playerName2: string | undefined;
       teamId: string | undefined;
   }
};
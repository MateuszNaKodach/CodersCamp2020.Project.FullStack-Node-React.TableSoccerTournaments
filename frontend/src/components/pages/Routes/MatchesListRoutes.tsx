import { useRouteMatch } from "react-router-dom";
import React from "react";
import {PATH_FOR_PLAYER_MATCHES_VIEW} from "../../atoms/constants/paths";
import {MatchesList} from "../../organisms/MatchesList/MatchesList";

export interface MatchesListRouteParams {
  readonly tournamentId: string;
}

export const MatchesListRoute = () => {
  const match = useRouteMatch<MatchesListRouteParams>(
      PATH_FOR_PLAYER_MATCHES_VIEW
  );
  const tournamentId = match?.params.tournamentId;
  if (!tournamentId) {
    return null;
  }
  return <MatchesList tournamentId={tournamentId} />;
};

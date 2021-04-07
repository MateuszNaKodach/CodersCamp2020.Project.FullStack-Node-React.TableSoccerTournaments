import { useRouteMatch } from "react-router-dom";
import React from "react";
import { TournamentRegistrations } from "../TournamentRegistrations";

export interface TournamentRegistrationsRouteParams {
  readonly tournamentId: string;
}

export const TournamentSettingsRoute = () => {
  const match = useRouteMatch<TournamentRegistrationsRouteParams>(
    "/tournament-registration/:tournamentId"
  );
  const tournamentId = match?.params.tournamentId;
  if (!tournamentId) {
    return null;
  }
  return <TournamentRegistrations tournamentId={tournamentId} />;
};

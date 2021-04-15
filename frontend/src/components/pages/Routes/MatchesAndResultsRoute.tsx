import {useRouteMatch} from "react-router-dom";
import React from "react";
import {PATH_FOR_MATCHES_AND_RESULTS} from "../../atoms/constants/routerPaths";
import {MatchesAndResults} from "../MatchesAndResults/MatchesAndResults";

export interface MatchesAndResultsRouteParams {
    readonly tournamentId: string;
}

export const MatchesAndResultsRoute = () => {
    const match = useRouteMatch<MatchesAndResultsRouteParams>(
        PATH_FOR_MATCHES_AND_RESULTS
    );
    const tournamentId = match?.params.tournamentId;
    if (!tournamentId) {
        return null;
    }
    return <MatchesAndResults tournamentId={tournamentId} />;
};

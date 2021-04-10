import { server } from "../../mocks/msw/server";
import { rest } from "msw";

export function postPlayerForTournamentWillAlwaysSuccess(tournamentId: string) {
  server.use(
    rest.post(
      `*/rest-api/tournament-registrations/${tournamentId}/players`,
      (req, res, ctx) => {
        return res(ctx.status(200));
      }
    )
  );
}

export function getRegisteredPlayersIdsWillReturn(
  tournamentId: string,
  status: string,
  registeredPlayersIds: string[]
) {
  server.use(
    rest.get(
      `*/rest-api/tournament-registrations/${tournamentId}`,
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            tournamentId: tournamentId,
            status: status,
            registeredPlayersIds: registeredPlayersIds,
          })
        );
      }
    )
  );
}

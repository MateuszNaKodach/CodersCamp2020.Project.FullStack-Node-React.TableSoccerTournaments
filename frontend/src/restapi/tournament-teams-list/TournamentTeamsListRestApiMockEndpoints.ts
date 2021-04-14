import { server } from "../../mocks/msw/server";
import { rest } from "msw";

export function getTournamentTeamsListWillReturn(
  tournamentId: string,
  teamId: string,
  firstTeamPlayer: string,
  secondTeamPlayer: string
) {
  server.use(
    rest.get(
      `*/rest-api/doubles-tournaments/${tournamentId}/teams`,
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            items: [
              {
                teamId,
                firstTeamPlayer,
                secondTeamPlayer,
              },
            ],
          })
        );
      }
    )
  );
}

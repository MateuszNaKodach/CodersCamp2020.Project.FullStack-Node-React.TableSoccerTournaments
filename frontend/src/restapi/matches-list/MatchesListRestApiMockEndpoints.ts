import { server } from "../../mocks/msw/server";
import { rest } from "msw";

export function getMatchesListWillReturn(
  tournamentId: string,
  status: string,
  MatchesArray: string[]
) {
  server.use(
    rest.get(
      `*/rest-api/doubles-tournaments/${tournamentId}/matches`,
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            tournamentId: tournamentId,
            status: status,
            queue: MatchesArray,
          })
        );
      }
    )
  );
}

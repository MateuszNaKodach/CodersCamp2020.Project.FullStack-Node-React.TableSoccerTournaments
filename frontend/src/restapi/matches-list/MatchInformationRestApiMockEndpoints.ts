import { server } from "../../mocks/msw/server";
import { rest } from "msw";

export function getMatchInformationWillReturn(
   matchId: string,
   firstMatchSideId: string,
   secondMatchSideId: string,
   winnerId: string
) {
  server.use(
    rest.get(
      `*/rest-api/matches/${matchId}`,
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
             matchId,
             firstMatchSideId,
             secondMatchSideId,
             winnerId
          })
        );
      }
    )
  );
}

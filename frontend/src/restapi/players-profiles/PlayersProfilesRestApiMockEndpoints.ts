import { PlayerProfileDto } from "./PlayerProfileDto";
import { server } from "../../mocks/msw/server";
import { rest } from "msw";

export function getPlayersProfilesWillReturn(
  playersProfiles: PlayerProfileDto[]
) {
  server.use(
    rest.get("*/rest-api/players-profiles", (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          items: playersProfiles,
        })
      );
    })
  );
}

export function getPlayersProfilesIsLoading() {
  server.use(
    rest.get("*/rest-api/players-profiles", (req, res, ctx) => {
      return res(ctx.delay("infinite"));
    })
  );
}

export function postPlayerProfilesWillAlwaysSuccess() {
  server.use(
    rest.post("*/rest-api/players-profiles", (req, res, ctx) => {
      return res(ctx.status(200));
    })
  );
}

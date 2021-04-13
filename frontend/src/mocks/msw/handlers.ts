import { rest } from "msw";

/**
 * This can mock API requests for local development if server is not ready. Example with players-profiles.
 * If you want to use real server set REACT_APP_MOCK_WITH_MSW to false in .env file.
 */
export const handlers = [
  rest.get("*/players-profiles", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        items: [
          {
            playerId: "2173fa23-8361-48a3-aadb-eceb1e9eca45",
            firstName: "Jan",
            lastName: "Kowalski",
            phoneNumber: "123321333",
            emailAddress: "jan.kowalski@test.pl",
          },
          {
            playerId: "2175fa23-8361-48a3-aadb-eceb1e9eca46",
            firstName: "Janina",
            lastName: "Kovalska",
            phoneNumber: "123321333",
            emailAddress: "jagienka12@niepodam.pl",
          },
          {
            playerId: "2f70ec21-e0dc-4d94-a8c4-8a0ab8826f04",
            firstName: "Katarzyna",
            lastName: "Nowak",
            phoneNumber: "143351333",
            emailAddress: "kasia12@test.pl",
          },
          {
            playerId: "1c9c7f76-0a1c-4fbd-a0ad-29d82aa642cb",
            firstName: "Tomek",
            lastName: "Domek",
            phoneNumber: "123321335",
            emailAddress: "tomek.domek@test.pl",
          },
          {
            playerId: "68286308-164c-4b21-a41f-17c1a2efa2b3",
            firstName: "Franek",
            lastName: "Ranek",
            phoneNumber: "123321334",
            emailAddress: "franek.ranek@test.pl",
          },
        ],
      })
    );
  }),

  rest.get(
    "*/rest-api/doubles-tournaments/:tournamentId/matches",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          tournamentId: "094469cf-6fcc-4947-a5c0-be1e94f54855",
          queue: [
            {
              matchNumber: 0,
              team1Id: "eleHasCat-a9a5-4296-a319-ebdfbadec6ba",
              team2Id: "LordJsonII-a9a5-4296-a319-ebdfbadec6ba",
              tableNumber: 1,
              status: "started",
            },
            {
              matchNumber: 1,
              team1Id: "NoEyesGuy-a9a5-4296-a319-ebdfbadec6ba",
              team2Id: "moldFear-a9a5-4296-a319-ebdfbadec6ba",
              tableNumber: 2,
              status: "started",
            },
            {
              matchNumber: 2,
              team1Id: "lameHamster-a9a5-4296-a319-ebdfbadec6ba",
              team2Id: "NonLameDuck-a9a5-4296-a319-ebdfbadec6ba",
              tableNumber: 3,
              status: "started",
            },
            {
              matchNumber: 3,
              team1Id: "butterMonster-429-ebdfbadec6ba",
              team2Id: "HorseWithoutTeeth-ebdfbadec6ba",
              tableNumber: 4,
              status: "ended",
            },
            {
              matchNumber: 4,
              team1Id: undefined,
              team2Id: undefined,
              tableNumber: undefined,
              status: "noTeams",
            },
            {
              matchNumber: 5,
              team1Id: "HorseWithoutTeeth-ebdfbadec6ba",
              team2Id: undefined,
              tableNumber: undefined,
              status: "noTeams",
            },
            {
              matchNumber: 6,
              team1Id: undefined,
              team2Id: undefined,
              tableNumber: undefined,
              status: "noTeams",
            },
          ],
        })
      );
    }
  ),

  rest.get("*/rest-api/matches/:matchId", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        matchId: "2480fc2c-bbd7-427c-9439-02f76583aef5",
        firstMatchSideId: "3510fc2c-bbd7-427c-9439-02f76583aef5",
        secondMatchSideId: "8321fc2c-bbd7-427c-9439-02f76583aef7",
        winnerId: "3510fc2c-bbd7-427c-9439-02f76583aef5",
      })
    );
  }),

  rest.get("*/rest-api/players-profiles/:playerId", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        matchId: "2480fc2c-bbd7-427c-9439-02f76583aef5",
        firstMatchSideId: "3510fc2c-bbd7-427c-9439-02f76583aef5",
        secondMatchSideId: "8321fc2c-bbd7-427c-9439-02f76583aef7",
        winnerId: "3510fc2c-bbd7-427c-9439-02f76583aef5",
      })
    );
  }),

  rest.get(
    "*/rest-api/doubles-tournaments/:tournamentId/teams",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          items: [
            {
              teamId: "b8fba7ff-be40-40a6-a350-3b6f36028f26",
              firstTeamPlayer: "24a3e792-16fc-48ac-9be2-f50f3ce88529",
              secondTeamPlayer: "703ec98c-a4fd-4313-9594-de711c744572",
            },
            {
              teamId: "f45a1908-bab5-4667-ae43-1618baaa4071",
              firstTeamPlayer: "b3c6b0bd-f93c-4b42-b31a-b5733c4a1578",
              secondTeamPlayer: "7fb8094f-e73e-403e-acc5-fe4f66904f8b",
            },
            {
              teamId: "8d763dd6-cde5-4a45-aabd-df65c20c4add",
              firstTeamPlayer: "20d82a7f-d19c-4eab-bf2d-222da4011260",
              secondTeamPlayer: "c3cd56f7-24b9-4092-8233-4125e23f8a56",
            },
            {
              teamId: "fb1b4826-edba-43ba-a238-a3bc7455f7c0",
              firstTeamPlayer: "8b3a9707-03ee-4af5-865d-93502fcfad21",
              secondTeamPlayer: "5167831d-706d-4001-8b71-780a1b87a385",
            },
          ],
        })
      );
    }
  ),

  rest.post("*/rest-api/matches/:matchId/result", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];

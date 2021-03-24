import { rest } from "msw";

export const handlers = [
  // Handles a POST /login request
  rest.post("/login", null),
  // Handles a GET /user request
  rest.get("/players-profiles", (req, res, ctx) => {
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
];

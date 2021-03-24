import { TournamentRegistrations } from "./TournamentRegistrations";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../mocks/msw/server";

describe("Tournament Registrations", () => {
  it(`should show title "Zapisy na turniej"`, () => {
    //When
    render(<TournamentRegistrations tournamentId="sampleTournamentId" />);

    //Then
    expect(screen.getByText("Zapisy na turniej")).toBeInTheDocument();
  });

  it(`should show all players profiles`, async () => {
    //Given
    server.use(
      rest.get("*/rest-api/players-profiles", (req, res, ctx) => {
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
            ],
          })
        );
      })
    );

    //When
    render(<TournamentRegistrations tournamentId="sampleTournamentId" />);

    //Then
    const found = await screen.findByText("Jan Kowalski");
    expect(found).toBeInTheDocument();
  });
});

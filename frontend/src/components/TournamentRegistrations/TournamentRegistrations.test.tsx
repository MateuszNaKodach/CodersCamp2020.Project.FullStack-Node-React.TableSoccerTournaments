import { TournamentRegistrations } from "./TournamentRegistrations";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../mocks/msw/server";
import { PlayerProfileDto } from "../../restapi/players-profiles";
import userEvent from "@testing-library/user-event";

describe("Tournament Registrations", () => {
  it(`should show title "Zapisy na turniej"`, () => {
    //Given
    getPlayersProfilesIsLoading();

    //When
    render(<TournamentRegistrations tournamentId="sampleTournamentId" />);

    //Then
    expect(screen.getByText("Zapisy na turniej")).toBeInTheDocument();
  });

  it("when players profiles are loading, then show loading indicator", async () => {
    //Given
    getPlayersProfilesIsLoading();

    //When
    render(<TournamentRegistrations tournamentId="sampleTournamentId" />);

    //Then
    expect(
      screen.getByTestId("TournamentRegistrationsLoadingIndicator")
    ).toBeInTheDocument();
  });

  it(`when players profiles are loaded, then hide loading indicator and show all players profiles`, async () => {
    //Given
    const playersProfiles: PlayerProfileDto[] = [
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
    ];
    getPlayersProfilesWillReturn(playersProfiles);

    //When
    render(<TournamentRegistrations tournamentId="sampleTournamentId" />);

    //Then
    await waitForElementToBeRemoved(() =>
      screen.getByTestId("TournamentRegistrationsLoadingIndicator")
    );

    const player1Name = await screen.findByText("Jan Kowalski");
    expect(player1Name).toBeInTheDocument();
    const player1Email = await screen.findByText("jan.kowalski@test.pl");
    expect(player1Email).toBeInTheDocument();

    const player2Name = await screen.findByText("Janina Kovalska");
    expect(player2Name).toBeInTheDocument();
    const player2Email = await screen.findByText("jagienka12@niepodam.pl");
    expect(player2Email).toBeInTheDocument();
  });

  it(`when search for player that not exists, then show alert about registering new player profile`, async () => {
    //Given
    const playersProfiles: PlayerProfileDto[] = [
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
    ];
    getPlayersProfilesWillReturn(playersProfiles);

    //When
    render(<TournamentRegistrations tournamentId="sampleTournamentId" />);
    await waitForElementToBeRemoved(() =>
      screen.getByTestId("TournamentRegistrationsLoadingIndicator")
    );
    const searchPlayerInput = await screen.findByLabelText("Zawodnik");
    userEvent.clear(searchPlayerInput);
    userEvent.type(searchPlayerInput, "Mufasa");

    //Then
    const playerNotFoundAlter = await screen.findByText(
      "Nie znaleziono zawodnika?"
    );
    expect(playerNotFoundAlter).toBeInTheDocument();

    const registerNewPlayerForTournamentButton = await screen.findByText(
      "Dodaj i zapisz"
    );
    expect(registerNewPlayerForTournamentButton).toBeInTheDocument();
  });
});

function getPlayersProfilesWillReturn(playersProfiles: PlayerProfileDto[]) {
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

function getPlayersProfilesIsLoading() {
  server.use(
    rest.get("*/rest-api/players-profiles", (req, res, ctx) => {
      return res(ctx.delay("infinite"));
    })
  );
}

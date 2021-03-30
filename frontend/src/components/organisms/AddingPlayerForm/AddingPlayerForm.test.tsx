import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { TournamentRegistrations } from "../../pages/TournamentRegistrations";
import { PlayerProfileDto } from "../../../restapi/players-profiles";
import { server } from "../../../mocks/msw/server";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";

describe("Adding player form", () => {
  it("after clicking button form should be shown and display title, inputs and button", async () => {
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
        lastName: "Kowalska",
        phoneNumber: "123321333",
        emailAddress: "jagienka12@niepodam.pl",
      },
    ];
    getPlayersProfilesWillReturn(playersProfiles);

    render(
      <Router>
        <TournamentRegistrations />
      </Router>
    );
    await waitForElementToBeRemoved(() =>
      screen.getByTestId("TournamentRegistrationsLoadingIndicator")
    );
    const searchPlayerInput = await screen.findByLabelText("Zawodnik");
    userEvent.clear(searchPlayerInput);
    userEvent.type(searchPlayerInput, "Mufasa");

    //When
    const registerNewPlayerForTournamentButton = await screen.findByText(
      "Dodaj i zapisz"
    );
    userEvent.click(registerNewPlayerForTournamentButton);

    //Then
    const newPlayerText = await screen.findByText("Nowy zawodnik");
    expect(newPlayerText).toBeInTheDocument();

    const savePlayerButton = await screen.findByText("Zapisz zawodnika");
    expect(savePlayerButton).toBeInTheDocument();

    //How to get inputs?
    const nameInput = await screen.findByLabelText("Imię");
    expect(nameInput).toBeInTheDocument();
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

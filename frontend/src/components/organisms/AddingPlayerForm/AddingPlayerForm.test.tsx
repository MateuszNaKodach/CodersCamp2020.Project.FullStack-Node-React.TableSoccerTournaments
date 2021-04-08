import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { TournamentRegistrations } from "../../pages/TournamentRegistrations";
import { PlayerProfileDto } from "../../../restapi/players-profiles";
import { server } from "../../../mocks/msw/server";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";

describe("Adding player form", () => {
  const tournamentId = "tournamentId";
  it("after clicking button form should be shown and display title, inputs and button", async () => {
    //Given
    const playersProfiles: PlayerProfileDto[] = [];
    getPlayersProfilesWillReturn(playersProfiles);
    postPlayerProfilesWillAlwaysSuccess();
    getRegisteredPlayersIdsWillReturn(tournamentId, "open", []);

    render(
      <Router>
        <TournamentRegistrations tournamentId={tournamentId} />
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

    const nameInput = await screen.findByLabelText("Imię");
    expect(nameInput).toBeInTheDocument();

    const surnameInput = await screen.findByLabelText("Nazwisko");
    expect(surnameInput).toBeInTheDocument();

    const email = await screen.findByLabelText("Adres e-mail");
    expect(email).toBeInTheDocument();

    const phone = await screen.findByLabelText("Numer telefonu");
    expect(phone).toBeInTheDocument();
  });

  it("after submitting form, notification should be displayed | happy path", async () => {
    //Given
    const playersProfiles: PlayerProfileDto[] = [];
    getPlayersProfilesWillReturn(playersProfiles);
    postPlayerProfilesWillAlwaysSuccess();
    getRegisteredPlayersIdsWillReturn(tournamentId, "open", []);

    render(
      <Router>
        <TournamentRegistrations tournamentId={tournamentId} />
      </Router>
    );
    await waitForElementToBeRemoved(() =>
      screen.getByTestId("TournamentRegistrationsLoadingIndicator")
    );
    const searchPlayerInput = await screen.findByLabelText("Zawodnik");
    userEvent.clear(searchPlayerInput);
    userEvent.type(searchPlayerInput, "Mufasa");

    const registerNewPlayerForTournamentButton = await screen.findByText(
      "Dodaj i zapisz"
    );
    userEvent.click(registerNewPlayerForTournamentButton);

    const name = "Test name";
    const nameInput = await screen.findByLabelText("Imię");
    userEvent.clear(nameInput);
    userEvent.type(nameInput, name);

    const surname = "Test surname";
    const surnameInput = await screen.findByLabelText("Nazwisko");
    userEvent.clear(surnameInput);
    userEvent.type(surnameInput, surname);

    const email = await screen.findByLabelText("Adres e-mail");
    userEvent.clear(email);
    userEvent.type(email, "testEmail@gmail.com");

    const phone = await screen.findByLabelText("Numer telefonu");
    userEvent.clear(phone);
    userEvent.type(phone, "123456789");

    //When
    const savePlayerButton = await screen.findByText("Zapisz zawodnika");
    userEvent.click(savePlayerButton);

    //Then
    await waitFor(() =>
      expect(
        screen.getByText(
          `Pomyślnie utworzono konto ${name} ${surname} oraz zapisano na turniej`
        )
      ).toBeInTheDocument()
    );
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

function postPlayerProfilesWillAlwaysSuccess() {
  server.use(
    rest.post("*/rest-api/players-profiles", (req, res, ctx) => {
      return res(ctx.status(200));
    })
  );
}

function getRegisteredPlayersIdsWillReturn(
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

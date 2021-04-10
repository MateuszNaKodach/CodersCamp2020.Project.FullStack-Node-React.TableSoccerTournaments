import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import { TournamentRegistrations } from "../../pages/TournamentRegistrations";
import { PlayerProfileDto } from "../../../restapi/players-profiles";
import userEvent from "@testing-library/user-event";
import {
  getPlayersProfilesWillReturn,
  postPlayerProfilesWillAlwaysSuccess,
} from "../../../restapi/players-profiles/PlayersProfilesRestApiMockEndpoints";
import {
  getRegisteredPlayersIdsWillReturn,
  postPlayerForTournamentWillAlwaysSuccess,
} from "../../../restapi/tournament-registrations/TournamentRegistrationsRestApiMockEndpoints";

describe("Adding player form", () => {
  beforeEach(async () => {
    getPlayersProfilesWillReturn(playersProfiles);
    postPlayerProfilesWillAlwaysSuccess();
    getRegisteredPlayersIdsWillReturn(tournamentId, "open", []);
    postPlayerForTournamentWillAlwaysSuccess(tournamentId);

    render(<TournamentRegistrations tournamentId={tournamentId} />);

    await waitForElementToBeRemoved(() =>
      screen.getByTestId("TournamentRegistrationsLoadingIndicator")
    );
    const searchPlayerInput = await screen.findByLabelText("Zawodnik");
    userEvent.clear(searchPlayerInput);
    userEvent.type(searchPlayerInput, "Mufasa");
  });

  const tournamentId = "tournamentId";
  const playersProfiles: PlayerProfileDto[] = [];

  it("after clicking button form should be shown and display title, inputs and button", async () => {
    //Given

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

import { TournamentRegistrations } from "./TournamentRegistrations";
import { render, screen } from "@testing-library/react";

describe("Tournament Registrations", function () {
  it(`should show title "Zapisy na turniej"`, function () {
    render(<TournamentRegistrations tournamentId="sampleTournamentId" />);

    expect(screen.getByText("Zapisy na turniej")).toBeInTheDocument();
  });
});

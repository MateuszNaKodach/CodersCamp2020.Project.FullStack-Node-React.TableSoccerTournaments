import { StartMenuComponent } from "./StartMenuComponent";
import {
  render,
  screen,
} from "@testing-library/react";

describe("Start Menu Component", () => {
  it(`should show title "TourDeFoos"`, () => {
    //Given
    //When
    render(<StartMenuComponent  />);
    //Then
    expect(screen.getByText("TourDeFoos")).toBeInTheDocument();
  });

  it(`should show buttons with text: "Turniej", "Zawodnicy"`, () => {
    //Given
    //When
    render(<StartMenuComponent  />);
    //Then
    expect(screen.getByText("Turniej")).toBeInTheDocument();
    expect(screen.getByText("Zawodnicy")).toBeInTheDocument();
  });
});

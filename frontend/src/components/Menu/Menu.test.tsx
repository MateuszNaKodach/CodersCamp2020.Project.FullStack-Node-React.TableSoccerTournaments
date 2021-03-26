import {Menu} from "./Menu";
import {
    render,
    screen,
} from "@testing-library/react";
import ReactTestUtils from 'react-dom/test-utils';

describe("Menu Component", () => {
    const mockCallback_1 = jest.fn();
    const mockCallback_2 = jest.fn();

    const menuButtonsListProps = [
        {
            textName: "Turniej",
            onClick: mockCallback_1
        },
        {
            textName: "Zawodnicy",
            onClick: mockCallback_2
        }
    ];

    it(`should show title "TourDeFoos"`, () => {
        //Given
        //When
        render(<Menu title={"TourDeFoos"} menuButtonsList={menuButtonsListProps}/>);
        //Then
        expect(screen.getByText("TourDeFoos")).toBeInTheDocument();
    });

    it(`should show buttons with text: "Turniej", "Zawodnicy"`, () => {
        //Given
        //When
        render(<Menu title={"TourDeFoos"} menuButtonsList={menuButtonsListProps}/>);
        //Then
        expect(screen.getByText("Turniej")).toBeInTheDocument();
        expect(screen.getByText("Zawodnicy")).toBeInTheDocument();
    });

    it(`when button is clicked, then functions is called`, () => {
        //Given
        //When
        render(<Menu title={"TourDeFoos"} menuButtonsList={menuButtonsListProps}/>);
        //Then
        screen.getByText("Turniej").click();
        expect(mockCallback_1).toBeCalled();

        ReactTestUtils.Simulate.doubleClick(screen.getByText("Turniej"));
        expect(mockCallback_1).toBeCalledTimes(1);
    });
});

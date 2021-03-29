import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer';

import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"; 

it("renders without crashing", ()=> {
    const div = document.createElement("div");
    ReactDOM.render(<Footer />, div);
});

it("renders Footer correctly", ()=> {
    const {getByTestId} = render(<Footer text="Copyright © TourDeFoos 2021"/>)
    expect(getByTestId('footer')).toHaveTextContent("Copyright © TourDeFoos 2021")
});

it("renders Footer correctly", ()=> {
    const {getByTestId} = render(<Footer text="Footer test text"/>)
    expect(getByTestId('footer')).toHaveTextContent("Footer test text")
});
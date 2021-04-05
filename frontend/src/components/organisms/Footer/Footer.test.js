import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer';

import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"; 

it("renders without crashing", ()=> {
    const div = document.createElement("div");
    ReactDOM.render(<Footer />, div);
});

it("renders Footer correctly with default text", ()=> {
    const {getByTestId} = render(<Footer />)
    expect(getByTestId('footer')).toHaveTextContent("Copyright © TourDeFoos 2021")
});

it("renders Footer correctly with given text", ()=> {
    const {getByTestId} = render(<Footer text="Footer test text"/>)
    expect(getByTestId('footer')).toHaveTextContent("Footer test text")
});
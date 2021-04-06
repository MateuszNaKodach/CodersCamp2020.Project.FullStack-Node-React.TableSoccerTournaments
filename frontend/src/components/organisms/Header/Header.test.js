import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"; 

it("renders without crashing", ()=> {
    const div = document.createElement("div");
    ReactDOM.render(<Header />, div);
});

it("renders Header correctly with default text", ()=> {
    const {getByTestId} = render(<Header />)
    expect(getByTestId('header')).toHaveTextContent("Wrocławski Klub Piłki Stołowej")
});

it("renders Header correctly with given text", ()=> {
    const {getByTestId} = render(<Header text="Header test text"/>)
    expect(getByTestId('header')).toHaveTextContent("Header test text")
});
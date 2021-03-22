import { render, screen } from '@testing-library/react';
import FooTouer from './FooTouer';
import '@testing-library/jest-dom';

test('renders example text', () => {
  render(<FooTouer />);
  const linkElement = screen.getByText(/HelloWorld/i);
  expect(linkElement).toBeInTheDocument();
});
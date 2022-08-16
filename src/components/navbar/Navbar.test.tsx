
import { render, screen } from '@testing-library/react';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import App from '../../App';


describe('Navbar Testing', () => {

  test('render navbar in App', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App/>
      </MemoryRouter>
    );
    expect(screen.getByTestId("navbar")).toBeTruthy();
  });

  test('render navbar sorting algorithms link', () => {
    render(<App />, {wrapper: BrowserRouter})
  //   // verify page content for default route
    expect(screen.getAllByText("Sorting")[0]).toBeInTheDocument()
  //   // verify page content for expected route after navigating
    userEvent.click(screen.getAllByText(/Sorting/i)[0])
    expect(screen.getByText(/SortingAlgorithms/i)).toBeInTheDocument()

    userEvent.click(screen.getAllByText(/Sorting/i)[1])
    expect(screen.getByText(/SortingAlgorithms/i)).toBeInTheDocument()
  });

  test('render navbar sorting algorithms link', () => {
    render(<App />, {wrapper: BrowserRouter})
  //   // verify page content for default route
    expect(screen.getAllByText("Sorting")[0]).toBeInTheDocument()
  //   // verify page content for expected route after navigating
    userEvent.click(screen.getAllByText(/Sorting/i)[0])
    expect(screen.getByText(/SortingAlgorithms/i)).toBeInTheDocument()
    
    userEvent.click(screen.getAllByText(/Sorting/i)[1])
    expect(screen.getByText(/SortingAlgorithms/i)).toBeInTheDocument()
  });

  test('render navbar sorting algorithms link', () => {
    render(<App />, {wrapper: BrowserRouter})
  //   // verify page content for default route
    expect(screen.getAllByText("Sorting")[0]).toBeInTheDocument()
  //   // verify page content for expected route after navigating
    userEvent.click(screen.getAllByText(/Sorting/i)[0])
    expect(screen.getByText(/SortingAlgorithms/i)).toBeInTheDocument()
    
    userEvent.click(screen.getAllByText(/Sorting/i)[1])
    expect(screen.getByText(/SortingAlgorithms/i)).toBeInTheDocument()
  });

  test('render navbar text algorithms link', () => {
    render(<App />, {wrapper: BrowserRouter})
  //   // verify page content for default route
    expect(screen.getAllByText("Text")[0]).toBeInTheDocument()
  //   // verify page content for expected route after navigating
    userEvent.click(screen.getAllByText(/Text/i)[0])
    expect(screen.getByText(/TextAlgorithms/i)).toBeInTheDocument()
    
    userEvent.click(screen.getAllByText(/Text/i)[1])
    expect(screen.getByText(/TextAlgorithms/i)).toBeInTheDocument()
  });

  test('render navbar graph algorithms link', () => {
    render(<App />, {wrapper: BrowserRouter})
  //   // verify page content for default route
    expect(screen.getAllByText("Graphing")[0]).toBeInTheDocument()
  //   // verify page content for expected route after navigating
    userEvent.click(screen.getAllByText(/Graphing/i)[0])
    expect(screen.getByText(/GraphAlgorithms/i)).toBeInTheDocument()
    
    userEvent.click(screen.getAllByText(/Graphing/i)[1])
    expect(screen.getByText(/GraphAlgorithms/i)).toBeInTheDocument()
  });

})
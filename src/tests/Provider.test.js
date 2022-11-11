import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import testData from "./testData";
import App from "../App";

const fetchMock = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(testData)
    }));
}

describe('Teste do provider', () => {
  it('', async () => {
    fetchMock();
    await act(async () => {
      render(<App />);
    });
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', { name: /filtrar/i });
    const btnOrder = screen.getByRole('button', {  name: /enviar/i})
    await act(async () => {
      userEvent.selectOptions(selectColumn, 'orbital_period');
      userEvent.selectOptions(selectComparison, 'maior que');
      userEvent.type(valueInput, '40');
      userEvent.click(btnFilter);
      userEvent.selectOptions(selectColumn, 'diameter');
      userEvent.selectOptions(selectComparison, 'igual a');
      userEvent.type(valueInput, '30');
      const inputNamePlanet = screen.getByRole('textbox');
      userEvent.type(inputNamePlanet, 'oo');
      userEvent.click(btnFilter);
      userEvent.selectOptions(selectColumn, 'diameter');
      userEvent.selectOptions(selectComparison, 'menor que');
      userEvent.type(valueInput, '50');
      userEvent.click(btnFilter);
      userEvent.selectOptions(selectColumn, 'diameter');
      userEvent.selectOptions(selectComparison, 'menor que');
      userEvent.type(valueInput, '50');
      userEvent.click(btnFilter);
      userEvent.click(btnOrder)
    });
    await act(async () => {
      userEvent.click(btnFilter);
    });
  });
});

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes do component Filters', () => {
  it('Altera os valores das tags select', () => {
    render(<App />);
    const columnSelect = screen.getByTestId('column-filter');
    const comparisonSelect = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const orderColumn = screen.getByTestId('column-sort');
    userEvent.selectOptions(orderColumn, 'diameter')
    userEvent.selectOptions(columnSelect, 'surface_water');
    userEvent.selectOptions(comparisonSelect, 'menor que');
    userEvent.type(valueFilter, '40');
  });
});

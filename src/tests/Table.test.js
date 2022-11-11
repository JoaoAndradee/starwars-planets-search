import React from 'react';
import { screen, render, cleanup } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import testData from './testData';
import App from '../App';

const fetchMock = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(testData)
    }));
}

describe('Testa o component table', () => {
  it('verifica chamada a api', async () => {
    fetchMock();
    await act(async () => {
      render(<App />);
    });
    expect(global.fetch).toHaveBeenCalled();
  });
});

import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const {
    filterBtns,
    numberFilter,
    setFilterColumn,
    setComparison,
    setNumberFilter,
  } = useContext(MyContext);

  return (
    <div style={ { margin: '20px', display: 'inline-block' } }>
      <div style={ { display: 'flex', justifyContent: 'space-between' } }>
        <label htmlFor="column-filter">
          Column filter:
          <select
            data-testid="column-filter"
            onChange={ ({ target: { value } }) => setFilterColumn(value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Comparison Filter:
          <select
            data-testid="comparison-filter"
            onChange={ ({ target: { value } }) => setComparison(value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          Valor:
          <input
            data-testid="value-filter"
            type="number"
            value={ numberFilter }
            onChange={ ({ target: { value } }) => setNumberFilter(value) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ filterBtns }
        >
          Filtrar
        </button>
      </div>
    </div>

  );
}

export default Filters;

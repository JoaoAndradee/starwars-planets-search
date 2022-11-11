import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const {
    filterBtns,
    numberFilter,
    setFilterColumn,
    setComparison,
    setNumberFilter,
    arrayTeste,
    handleOrder,
    handleOrderCheck,
    setOrderList,
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
            {arrayTeste.map((item, index) => (
              <option key={ index } value={ item }>{item}</option>
            ))}
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
        <div style={ { marginLeft: '20px' } }>
          Ordenar:
          <select
            id="filter-order"
            data-testid="column-sort"
            onChange={ ({ target: { value } }) => {
              setOrderList((prevState) => ({
                order: {
                  ...prevState.order,
                  column: value,
                },
              }));
            } }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
          <div
            onChange={ handleOrderCheck }
          >
            Ascendente:
            <input
              type="radio"
              data-testid="column-sort-input-asc"
              value="ASC"
              name="sort"
              onChange={ handleOrderCheck }
            />
            Descendente:
            <input
              type="radio"
              data-testid="column-sort-input-desc"
              value="DESC"
              name="sort"
              onChange={ handleOrderCheck }
            />
          </div>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ handleOrder }
          >
            Enviar
          </button>
        </div>
      </div>
    </div>

  );
}

export default Filters;

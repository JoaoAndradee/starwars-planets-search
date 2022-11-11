import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import MyContext from './MyContext';
import getPlanets from '../services/getPlanets';

function Provider({ children }) {
  const [planetsKeys, setPlanetsKeys] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [filterColumn, setFilterColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState(0);
  const [multFilters, setMultFilters] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    filterByNumericValues: [],
  });
  const [arrayTeste, setArrayTeste] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [orderList, setOrderList] = useState({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });

  const handleOrderCheck = ({ target: { value } }) => {
    setOrderList((prev) => ({
      order: {
        ...prev.order,
        sort: value,
      },
    }));
  };

  const handleOrder = () => {
    const { order: { column, sort } } = orderList;
    const withoutUnk = planets.filter((planet) => planet[column] !== 'unknown');
    const withUnk = planets.filter((planet) => planet[column] === 'unknown');
    const neg = -1;
    const ordered = withoutUnk
      .sort((a, b) => (Number(a[column]) < Number(b[column]) ? neg : 1));
    if (sort === 'DESC') {
      ordered.reverse();
    }
    ordered.push(...withUnk);
    setPlanets(() => ([
      ...ordered,
    ]));
  };

  useEffect(() => {
    const dataPlanets = async () => {
      const objPlanets = await getPlanets();
      const { results } = objPlanets;
      setPlanetsKeys(objPlanets.keys);
      if (nameInput.length === 0) {
        setPlanets(results);
      } else {
        const filtered = results
          .filter(({ name }) => name.toLowerCase().includes(nameInput));
        setPlanets(filtered);
      }
    };
    dataPlanets();
  }, [nameInput]);

  const removeColumnFilter = (column) => {
    const removeColumn = arrayTeste.filter((item) => item !== column);
    setArrayTeste(removeColumn);
  };

  const filterBtns = async () => {
    let resultados;
    if (!multFilters.length) {
      const { results } = await getPlanets();
      resultados = results;
    } else {
      resultados = planets;
    }
    switch (comparison) {
    case 'maior que': {
      const filtrando = resultados
        .filter((planet) => planet[filterColumn] > Number(numberFilter));
      setPlanets(filtrando);
      setMultFilters(filtrando);
      const myObj = {
        column: filterColumn,
        comparison,
        value: numberFilter,
      };
      setFilterByNumericValues((prev) => ({
        filterByNumericValues: [
          ...prev.filterByNumericValues,
          myObj,
        ],
      }));
      removeColumnFilter(filterColumn);
      break;
    }
    case 'menor que': {
      const filtrando = resultados
        .filter((planet) => planet[filterColumn] < Number(numberFilter));
      setPlanets(filtrando);
      setMultFilters(filtrando);
      break;
    }
    default: {
      const filtrando = resultados
        .filter((planet) => planet[filterColumn] === numberFilter);
      setPlanets(filtrando);
      setMultFilters(filtrando);
      break;
    }
    }
  };

  const handleNameInput = ({ target: { value } }) => {
    setNameInput(value);
  };

  const contextValue = useMemo(() => ({
    planets,
    planetsKeys,
    nameInput,
    numberFilter,
    handleNameInput,
    setFilterColumn,
    setComparison,
    setNumberFilter,
    filterBtns,
    filterByNumericValues,
    setFilterByNumericValues,
    arrayTeste,
    handleOrder,
    handleOrderCheck,
    setOrderList,
  }), [
    handleOrderCheck,
    handleOrder,
    arrayTeste,
    filterByNumericValues,
    setFilterByNumericValues,
    setPlanets,
    setOrderList,
    numberFilter,
    planets,
    planetsKeys,
    nameInput,
  ]);

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

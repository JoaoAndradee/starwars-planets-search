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
      break;
    }
    case 'menor que': {
      const filtrando = resultados
        .filter((planet) => planet[filterColumn] < Number(numberFilter));
      setPlanets(filtrando);
      setMultFilters(filtrando);
      break;
    }
    case 'igual a': {
      const filtrando = resultados
        .filter((planet) => planet[filterColumn] === numberFilter);
      setPlanets(filtrando);
      setMultFilters(filtrando);
      break;
    }
    default:
      return console.log('default');
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
  }), [
    // filterBtns,
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

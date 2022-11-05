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
    const { results } = await getPlanets();
    switch (comparison) {
    case 'maior que': {
      setPlanets(results.filter((planet) => planet[filterColumn] > Number(numberFilter)));
      break;
    }
    case 'menor que': {
      setPlanets(results.filter((planet) => planet[filterColumn] < Number(numberFilter)));
      break;
    }
    case 'igual a': {
      console.log('igual a');
      setPlanets(results
        .filter((planet) => planet[filterColumn] === numberFilter));
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

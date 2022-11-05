import { useContext } from 'react';
import MyContext from '../context/MyContext';
import Filters from './Filters';

function Table() {
  const { planets, planetsKeys, handleNameInput } = useContext(MyContext);
  return (
    <>
      <form>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ handleNameInput }
        />
        <Filters />
      </form>
      <table>
        <thead>
          <tr>
            {planetsKeys.map((key, index) => <th key={ index }>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {planets.map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;

import './App.css';
import Search from './components/Search.tsx';
import Result from './components/Result.tsx';
import { getAllPlanets } from './services/getAllPlanets.ts';
import { Component } from 'react';
import type { PlanetProps } from './components/Planet.tsx';

class App extends Component {
  state: {
    planets: PlanetProps[];
    isLoading: boolean;
    foundPlanets: PlanetProps[];
  } = {
    planets: [],
    isLoading: true,
    foundPlanets: [],
  };
  async componentDidMount() {
    try {
      const resp = await getAllPlanets();
      if (resp && 'results' in resp) {
        this.setState({ planets: resp.results, isLoading: false });
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  setFoundPlanet = (planetsRes: PlanetProps[]) => {
    this.setState({ foundPlanets: planetsRes });
  };
  setIsLoading = (value: boolean) => {
    this.setState({ isLoading: value });
  };
  render() {
    return (
      <div className="">
        <Search
          onSearch={this.setFoundPlanet}
          setIsLoading={this.setIsLoading}
        />
        <Result
          planets={
            this.state.foundPlanets.length > 0
              ? this.state.foundPlanets
              : this.state.planets
          }
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

export default App;

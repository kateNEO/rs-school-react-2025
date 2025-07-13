import './App.css';
import Search from './components/Search.tsx';
import Result from './components/Result.tsx';
import { Component } from 'react';
import type { PlanetProps } from './components/Planet.tsx';
import { initialPlanetsDisplay } from './services/initialPlanetsDisplay.ts';

class App extends Component {
  state: {
    planets: PlanetProps[];
    isLoading: boolean;
  } = {
    planets: [],
    isLoading: true,
  };
  setPlanet = (planetsRes: PlanetProps[]) => {
    this.setState({ planets: planetsRes });
  };
  setIsLoading = (value: boolean) => {
    this.setState({ isLoading: value });
  };

  componentDidMount() {
    initialPlanetsDisplay(this.setPlanet, this.setIsLoading);
  }

  render() {
    return (
      <div className="">
        <Search onSearch={this.setPlanet} setIsLoading={this.setIsLoading} />
        <Result planets={this.state.planets} isLoading={this.state.isLoading} />
      </div>
    );
  }
}

export default App;

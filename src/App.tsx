import './App.css';
import Search from './components/Search.tsx';
import Result from './components/Result.tsx';
import { getAllPlanets } from './services/getAllPlanets.ts';
import { Component } from 'react';
import type { PlanetProps } from './components/Planet.tsx';

class App extends Component {
  state: { planets: PlanetProps[]; isLoading: boolean } = {
    planets: [],
    isLoading: true,
  };
  async componentDidMount() {
    try {
      const resp = await getAllPlanets();
      if (resp && 'results' in resp) {
        this.setState({ planets: resp.results, isLoading: false });
        console.log(resp.results);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  render() {
    return (
      <div className="">
        <Search />
        <Result planets={this.state.planets} isLoading={this.state.isLoading} />
      </div>
    );
  }
}

export default App;

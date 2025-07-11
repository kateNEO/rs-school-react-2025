import './App.css';
import Search from './components/Search.tsx';
import Result from './components/Result.tsx';
import { getAllPlanets } from './services/getAllPlanets.ts';
import { Component } from 'react';

class App extends Component {
  async componentDidMount() {
    try {
      const planets = await getAllPlanets();
      console.log(planets);
      // this.setState({ planets, loading: false });
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  render() {
    return (
      <div className="">
        <Search />
        <Result />
      </div>
    );
  }
}

export default App;

import './App.css';
import Search from './components/Search.tsx';
import Result from './components/Result.tsx';
import { Component } from 'react';
import type { PlanetProps } from './components/Planet.tsx';
import { initialPlanetsDisplay } from './services/initialPlanetsDisplay.ts';

export type Response = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlanetProps[];
};
class App extends Component {
  state: {
    error: string | null;
    responseState: Response | null;
    isLoading: boolean;
  } = {
    error: null,
    responseState: null,
    isLoading: true,
  };
  setResponse = (response: Response) => {
    this.setState({ responseState: response });
  };
  setIsLoading = (value: boolean) => {
    this.setState({ isLoading: value });
  };
  setError = (error: string) => {
    this.setState({ error: error });
  };
  componentDidMount() {
    initialPlanetsDisplay(this.setResponse, this.setIsLoading, this.setError);
  }
  render() {
    console.log(this.state.error);
    return (
      <div className="">
        <Search onSearch={this.setResponse} setIsLoading={this.setIsLoading} />
        <Result
          response={this.state.responseState}
          isLoading={this.state.isLoading}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;

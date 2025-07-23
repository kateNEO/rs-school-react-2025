import './App.css';
import Search from './components/Search.tsx';
import Result from './components/Result.tsx';
import { Component } from 'react';
import { initialPlanetsDisplay } from './services/initialPlanetsDisplay.ts';

export type PlanetList = {
  name: string;
  url: string;
};
export type Response = {
  total_records: number;
  next: string | null;
  previous: string | null;
  total_pages: number;
  result: PlanetList[];
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
    return (
      <div className="px-5">
        <Search onSearch={this.setResponse} setIsLoading={this.setIsLoading} />
        <Result
          response={this.state.responseState}
          isLoading={this.state.isLoading}
          error={this.state.error}
          setIsLoading={this.setIsLoading}
        />
      </div>
    );
  }
}

export default App;

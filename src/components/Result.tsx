import { Component } from 'react';
import Planet, { type PlanetProps } from './Planet.tsx';
import Button from './Button.tsx';
import type { Response } from '../App.tsx';
import Pagination from './Pagination.tsx';
type ResultProps = {
  response: Response;
  isLoading: boolean;
  error: string | null;
  setIsLoading: (value: boolean) => void;
};

class Result extends Component<ResultProps> {
  state = {
    errorRender: false,
  };
  render() {
    const { response, isLoading } = this.props;
    if (this.state.errorRender) {
      throw new Error('I broke down!');
    }
    if (isLoading) return <p className="text-gray-500">Loading...</p>;
    if (this.props.error)
      return <p className="text-gray-500">{this.props.error}</p>;
    if (!response) return <p className="text-gray-500">Something wrong</p>;
    return (
      <div className="flex flex-col gap-5">
        <div className="flex justify-center items-center flex-wrap gap-[4.9vw] py-5 xl:justify-start">
          {response.count > 0 ? (
            response.results.map((planet: PlanetProps) => (
              <Planet
                key={planet.name}
                name={planet.name}
                climate={planet.climate}
                diameter={planet.diameter}
                gravity={planet.gravity}
                population={planet.population}
                terrain={planet.terrain}
              />
            ))
          ) : (
            <p className="text-gray-500">Not Found :( </p>
          )}
        </div>
        <Pagination
          responseObj={this.props.response}
          setIsLoading={this.props.setIsLoading}
        />
        <Button
          disabled={false}
          onClick={() => this.setState({ errorRender: true })}
          text="Error Button"
        />
      </div>
    );
  }
}
export default Result;

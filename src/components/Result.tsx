import { Component } from 'react';
import Button from './Button.tsx';
import type { PlanetList, Response } from './MainPage.tsx';
type ResultProps = {
  response: Response | null;
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
    console.log(response);
    if (this.state.errorRender) {
      throw new Error('I broke down!');
    }
    if (isLoading) return <p className="text-gray-500">Loading...</p>;
    if (this.props.error)
      return <p className="text-gray-500">{this.props.error}</p>;
    if (!response) return <p className="text-gray-500">Something wrong</p>;
    return (
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="flex flex-wrap justify-start gap-[2vw] py-3">
            {response.total_records > 0 ? (
              response.result.map((planet: PlanetList) => (
                <div
                  key={planet.name}
                  className="px-2 text-white h-10
                   hover:cursor-pointer"
                >
                  <div className="flex items-center gap-2 px-6 py-1">
                    <span>🪐</span>
                    <h2
                      className="text-2xl drop-shadow-[1px_1px_1px_#FFF] font-bold text-gray-700 mb-0 duration-300
                    hover:drop-shadow-[1px_1px_2px_#FFF]"
                    >
                      {planet.name}
                    </h2>
                  </div>
                </div>

                // <Planet
                //   key={planet.name}
                //   name={planet.name}
                //   climate={planet.climate}
                //   diameter={planet.diameter}
                //   gravity={planet.gravity}
                //   population={planet.population}
                //   terrain={planet.terrain}
              ))
            ) : (
              <p className="text-gray-500">Not Found :( </p>
            )}
          </div>
          <div className="hidden w-60 h-20"></div>
        </div>
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

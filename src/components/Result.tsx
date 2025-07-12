import { Component } from 'react';
import Planet, { type PlanetProps } from './Planet.tsx';
import Button from './Button.tsx';
type ResultProps = {
  planets: PlanetProps[];
  isLoading: boolean;
};

class Result extends Component<ResultProps> {
  render() {
    const { planets, isLoading } = this.props;
    console.log(planets);
    if (isLoading) return <p className="text-gray-500">Loading...</p>;
    return (
      <div>
        <div className="flex justify-start items-center flex-wrap gap-[4.9vw] py-5">
          {planets.map((planet: PlanetProps) => (
            <Planet
              key={planet.name}
              name={planet.name}
              climate={planet.climate}
              diameter={planet.diameter}
              gravity={planet.gravity}
              population={planet.population}
              terrain={planet.terrain}
            />
          ))}
        </div>
        <Button onClick={error} text="Error Button" />
      </div>
    );
  }
}
export default Result;

function error() {}

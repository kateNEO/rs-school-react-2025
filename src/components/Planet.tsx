import { Component } from 'react';

type PlanetProps = {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  diameter: string;
  gravity: string;
};

class Planet extends Component<PlanetProps> {
  render() {
    const { name, climate, terrain, population, diameter, gravity } =
      this.props;
    return (
      <div className=" w-60 h-90 flex flex-col items-center justify-center border border-gray-200 rounded-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {name}
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1 bg-gray-100 bg-opacity-50 rounded-md p-6">
          <p>
            <span className="font-medium">Climate:</span> {climate}
          </p>
          <p>
            <span className="font-medium">Terrain:</span> {terrain}
          </p>
          <p>
            <span className="font-medium">Population:</span> {population}
          </p>
          <p>
            <span className="font-medium">Diameter:</span> {diameter} km
          </p>
          <p>
            <span className="font-medium">Gravity:</span> {gravity}
          </p>
        </div>
      </div>
    );
  }
}

export default Planet;

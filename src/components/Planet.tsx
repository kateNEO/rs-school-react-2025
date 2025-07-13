import { Component } from 'react';
import { images, randomImages } from '../services/randomImages.ts';

export type PlanetProps = {
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
      <div
        className={`w-60 h-85 flex ${randomImages(images)} px-3 flex-col items-center justify-center border border-gray-200
          rounded-md bg-cover hover:cursor-pointer hover:shadow-[0_4px_20px_#9ca3af] duration-500`}
      >
        <h2 className="text-2xl drop-shadow-[1px_1px_0px_#FFF] font-bold text-gray-800 mb-2">
          {name}
        </h2>
        <div
          className="bg-gray-100/50 w-full text-sm text-gray-600 rounded-md p-6
         hover:bg-blue-50 duration-500"
        >
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

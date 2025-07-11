import { Component } from 'react';
import Planet from './Planet.tsx';

class Result extends Component {
  render() {
    return (
      <div className="flex justify-between items-center py-5">
        <Planet
          name="Tatooine"
          climate="good"
          diameter="123"
          gravity="40"
          population="123456"
          terrain="rocky"
        />
      </div>
    );
  }
}
export default Result;

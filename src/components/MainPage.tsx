import { useEffect, useState } from 'react';
import { initialPlanetsDisplay } from '../services/initialPlanetsDisplay.ts';
import { Link } from 'react-router-dom';
import Search from './Search.tsx';
import Result from './Result.tsx';

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

function MainPage() {
  const [responseState, setResponseState] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initialPlanetsDisplay(setResponseState, setIsLoading, setError);
  }, []);

  return (
    <div className="px-5">
      <Link to="/about" className="text-xl text-white">
        About
      </Link>
      <Search onSearch={setResponseState} setIsLoading={setIsLoading} />
      <Result response={responseState} isLoading={isLoading} error={error} />
    </div>
  );
}
export default MainPage;

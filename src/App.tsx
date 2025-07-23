import './App.css';
// import Search from './components/Search.tsx';
// import Result from './components/Result.tsx';
// import { useEffect, useState } from 'react';
// import { initialPlanetsDisplay } from './services/initialPlanetsDisplay.ts';
import { Outlet, useLocation } from 'react-router-dom';

// export type PlanetList = {
//   name: string;
//   url: string;
// };
// export type Response = {
//   total_records: number;
//   next: string | null;
//   previous: string | null;
//   total_pages: number;
//   result: PlanetList[];
// };
const App = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="px-5">
      <Outlet />
    </div>
  );
  // const [responseState, setResponseState] = useState<Response | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  //
  // useEffect(() => {
  //   initialPlanetsDisplay(setResponseState, setIsLoading, setError);
  // }, []);
  //
  // return (
  //   <div className="px-5">
  //     <Link to='/about' className='text-xl text-white'>About</Link>
  //     <Search onSearch={setResponseState} setIsLoading={setIsLoading} />
  //     <Outlet />
  //     <Result
  //       response={responseState}
  //       isLoading={isLoading}
  //       error={error}
  //       setIsLoading={setIsLoading}
  //     />
  //   </div>
  // );
};

export default App;

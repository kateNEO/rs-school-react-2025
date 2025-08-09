import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.tsx';

const App = () => {
  return (
    <div className="px-5">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;

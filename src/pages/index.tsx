import Header from '../components/Header';
import MainPage from './page/[pageNumber].tsx';

const AppContainer = () => {
  return (
    <div className="px-5">
      <Header />
      <MainPage />
    </div>
  );
};

export default AppContainer;

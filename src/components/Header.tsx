import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/paths.ts';
import Dark from '../images/Dark.svg?react';
import Light from '../images/Light.svg?react';
import { useTheme } from '../hooks/themeContext.ts';

function Header() {
  const { theme, toggle } = useTheme();
  return (
    <div className="flex justify-between text-inherit px-5">
      <div className="flex gap-5">
        <Link
          to={ROUTES.HOME}
          className="text-xl font-bold text-gray-700 text-inherit text-shadow: inherit; hover:drop-shadow-[1px_1px_2px_#FFF]"
        >
          Home
        </Link>
        <Link
          to={ROUTES.ABOUT}
          className="text-xl font-bold text-gray-700 text-inherit text-shadow: inherit; hover:drop-shadow-[1px_1px_2px_#FFF]"
        >
          About
        </Link>
      </div>
      <div className="" onClick={toggle}>
        {theme === 'dark' ? (
          <Light className="w-8 h-8 stroke-gray-500 duration-300 hover:stroke-gray-400 hover:cursor-pointer" />
        ) : (
          <Dark className="w-8 h-8 stroke-gray-500 duration-300 hover:stroke-gray-400 hover:cursor-pointer" />
        )}
      </div>
    </div>
  );
}

export default Header;

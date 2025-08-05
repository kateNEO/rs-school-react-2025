import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/paths.ts';
import Dark from '../images/Dark.svg?react';
import Light from '../images/Light.svg?react';
import { useTheme } from '../hooks/themeContext.ts';

function Header() {
  const { theme, toggle } = useTheme();
  return (
    <div className="flex gap-5 justify-start text-inherit">
      <Link
        to={ROUTES.ABOUT}
        className="text-xl font-bold text-gray-700 text-inherit text-shadow: inherit; hover:drop-shadow-[1px_1px_2px_#FFF]"
      >
        About
      </Link>
      <div className="" onClick={toggle}>
        {theme === 'light' ? (
          <Light className="w-8 h-8 stroke-gray-500" />
        ) : (
          <Dark className="w-8 h-8 stroke-gray-500" />
        )}
      </div>
    </div>
  );
}

export default Header;

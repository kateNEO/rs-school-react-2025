import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/paths.ts';
import Light from '../images/Light.svg?react';
function Header() {
  return (
    <>
      <Link
        to={ROUTES.ABOUT}
        className="text-xl font-bold text-gray-700 hover:drop-shadow-[1px_1px_2px_#FFF]"
      >
        About
      </Link>
      <div className="">
        <div>
          <Light />
        </div>
        <div></div>
      </div>
    </>
  );
}
export default Header;

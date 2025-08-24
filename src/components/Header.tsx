import { ROUTES } from '../routes/paths';
import { useTheme } from '../hooks/themeContext';
import Link from 'next/link';
import Image from 'next/image';
import LightIcon from '../../public/images/Light.svg';
import DarkIcon from '../../public/images/Dark.svg';
import Button from './Button';
import { useState } from 'react';
import { ModalWrapper } from './ModalWrapper';
import RHFForm from './RHFForm';
import UncontrolledForm from './UncontrolledForm';

function Header() {
  const [isUncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [isRHFOpen, setRHFOpen] = useState(false);
  const { theme, toggle } = useTheme();
  return (
    <div className="flex justify-between text-inherit px-5">
      <div className="flex gap-5">
        <Link
          href={ROUTES.HOME}
          className="text-xl font-bold text-gray-700 text-inherit text-shadow: inherit; hover:drop-shadow-[1px_1px_2px_#FFF]"
        >
          Home
        </Link>
        <Link
          href={ROUTES.ABOUT}
          className="text-xl font-bold text-gray-700 text-inherit text-shadow: inherit; hover:drop-shadow-[1px_1px_2px_#FFF]"
        >
          About
        </Link>
        <Button
          text="uncontrolled"
          type="button"
          onClick={() => setUncontrolledOpen(true)}
        />
        <Button text="RHF" type="button" onClick={() => setRHFOpen(true)} />
      </div>
      <div
        className="w-8 h-8 stroke-gray-500 duration-300 hover:stroke-gray-400 hover:cursor-pointer"
        onClick={toggle}
      >
        <Image
          src={theme === 'dark' ? LightIcon : DarkIcon}
          alt={theme === 'dark' ? 'light' : 'dark'}
          width={32}
          height={32}
        />
      </div>
      <ModalWrapper
        isOpen={isUncontrolledOpen}
        onClose={() => setUncontrolledOpen(false)}
      >
        <UncontrolledForm />
      </ModalWrapper>
      <ModalWrapper isOpen={isRHFOpen} onClose={() => setRHFOpen(false)}>
        <RHFForm />
      </ModalWrapper>
    </div>
  );
}

export default Header;

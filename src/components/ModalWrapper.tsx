import React from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const ModalWrapper: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl max-w-xl w-full p-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 text-xl font-bold duration-300 hover:cursor-pointer hover:drop-shadow-[1px_1px_2px_#FFF]"
        >
          {' '}
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

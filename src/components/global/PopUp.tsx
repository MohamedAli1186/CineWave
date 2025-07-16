import React, { type PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  onClose: () => void;
  className?: string;
}

const Popup: React.FC<IProps> = ({ onClose, children, className }) => {
  return (
    <div
      className="bg-[#0000009f] fixed top-0 
      left-0
      z-30 
      flex h-full
      w-full items-center
      justify-center"
      onClick={onClose}
      data-cy="popup"
    >
      <div
        className={`relative mx-6
          my-10 max-h-[calc(80vh_-_5rem)]
          w-1/3 
          overflow-auto
          rounded-[1.25rem]
          ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          title="Close"
          type="button"
          className="fz-40 absolute top-7 right-6 h-auto w-[14px] cursor-pointer"
          onClick={onClose}
          data-cy="popup-close-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;

'use client';

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";


interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  removeAllNotification?: any,
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  body, 
  actionLabel, 
  disabled,
  removeAllNotification,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
  
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }, [onClose, disabled]);



  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        onClick={handleClose}
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-40 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
      >
        </div>
        <div className="
          absolute
          z-50
          right-0
          h-screen
          "
        >
          {/*content*/}
          <div className={`
            translate
            duration-300
            fixed 
            right-0
            w-[500px]
            h-full
            ${showModal ? 'translate-x-0' : 'translate-x-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="
              translate
              h-full
              border-0 
              shadow-lg 
              bg-white
              flex 
              flex-col 
              w-full 
              outline-none 
              focus:outline-none
            "
            >
              {/*header*/}
              <div className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
              >
                <button
                  className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">
                  {title}
                </div>
                <button
                  className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    right-9
                  "
                  onClick={() => {removeAllNotification()}}
                >
                  Remove all
                </button>
              </div>
              {/*body*/}
              <div className="relative flex-auto">
                {body}
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Modal;

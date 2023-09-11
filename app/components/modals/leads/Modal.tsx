'use client';

import useEditModal from "@/app/hooks/useEditModal";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose, IoMdSettings } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  onClose: any,
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  modal: any,
  editModalOpen?: any
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  body, 
  actionLabel, 
  modal,
  editModalOpen,
  disabled,
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
      onClose(false);
    }, 300)
  }, [onClose, disabled]);


  const handleSubmit = useCallback(() => {
      if (disabled) {
          return;
      }

  onSubmit && onSubmit();
  }, [onSubmit, disabled]);


  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          flex 
          font-sans
          justify-end 
          items-center 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
      >
        <div className="
          my-6
          absolute
          mx-auto
          w-full
          lg:w-[92%]
          h-full
          p-0
          "
        >
          {/*content*/}
          <div className={`
            translate
            duration-300
            ${showModal ? 'translate-x-0' : 'translate-x-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="absolute w-full justify-center items-center flex bg-blue-300 mt-5 h-12 rounded-l-2xl">
              <div className="relative bg-blue-800 w-full h-full rounded-l-2xl items-center flex">
                <button
                      className="
                        p-1
                        border-0 
                        left-0 top-0
                        ml-2
                        flex
                        text-center
                        items-center
                        justify-center
                        text-white
                        hover:opacity-70
                        transition
                      "
                      onClick={handleClose}
                    >
                    <IoMdClose size={20} />
                    <span className="text-white ml-1 text-1xl">Lead</span>
                  </button>
              </div>
            </div>
            <div className="
              translate
              border-0 
              w-[94%]
              h-screen 
              shadow-lg 
              absolute 
              right-0
              flex 
              flex-col  
              bg-white 
              outline-none 
              focus:outline-none
            "
            >
              <div className={`text-lg w-full border-b border-gray-200 h-[200px] mt-0 flex justify-between items-center font-semibold`}>
                  <h1 className="ml-5 text-2xl">{title}</h1>
                  <button className="mr-5 " onClick={() => {
                    editModalOpen()
                  }}><IoMdSettings size={35} /> </button>
              </div>
              {/*body*/}
              <div className="relative p-2 bg-gray-100 flex-auto">
                {body}
              </div>

              {modal}

              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;

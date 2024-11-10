
import { ReactNode } from "react";
// import { Dispatch, SetStateAction } from 'react';

type CustomModalPropsType = {
    openModal: boolean;
    closeModal: () => void;
    // closeModal: (setOpenModal: Dispatch<SetStateAction<boolean>>) => void;
    component: ReactNode;
}

const CustomModal = ({ openModal, closeModal, component }: CustomModalPropsType) => {
    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
        
        const target = e.target as HTMLElement;
        if (target.id === "modal-backdrop") closeModal();
        
    };
  
    if (!openModal) return null;
  
    return (
      <div
        id="modal-backdrop"
        className="bg-black fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[99]"
        onClick={handleCloseModal}
      >
        <div className="">
            {component}
        </div>
      </div>
    );
};

export default CustomModal;
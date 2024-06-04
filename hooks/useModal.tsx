import { useState } from "react";

const useModal = () => {
  const [show, setShow] = useState<boolean>(false);

  const openModal = () => setShow(true);

  const closeModal = () => setShow(false);

  return {
    show,
    openModal,
    closeModal,
  };
};

export default useModal;

import React, { useEffect, useCallback } from "react";
import css from "./modal.module.css";

export const Modal = ({ largeImageURL, onClose }) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  const handleOverlayClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

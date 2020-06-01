import React from 'react';



const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName} onClick={handleClose}>
      <section>
        <div className="content">{ children }</div>
        <button className="close-modal">Close</button>
      </section>
    </div>
  );
}



export default Modal;

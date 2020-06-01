import React from 'react';
import toaster from 'toasted-notes';



function notification(type, text, duration) {
  toaster.notify(({ onClose }) => (
    <div className={ `notification notification-${ type }` }>
      <div className="content">{ text }</div>
      <button
        className="close"
        onClick={ onClose }
        type="button"
        aria-label="Close"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  ), { duration });
}



export default notification;

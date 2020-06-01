import React from 'react';



const MobileControl = props => {

  const text = props.answerRevealed ? '(Hide answer on phone)' : '(Show answer on phone)';
  
  return (
    <div id="MobileControl" className="flex-grid">
      <button onClick={props.togglePrivateAnswer}>{text}</button>
    </div>
  )
};



export default MobileControl;

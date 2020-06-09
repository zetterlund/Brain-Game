import React from 'react';



export default function MobileControl(props) {

  const text = props.answerRevealed ? 'Hide answer on phone' : 'Show answer on phone';

  return (
    <div id="MobileControl">
      <button
        className={props.answerRevealed ? 'hide' : 'show' }
        onClick={props.togglePrivateAnswer}
      >
        {text}
      </button>
    </div>
  )
}

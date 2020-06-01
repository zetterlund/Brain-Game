import React from 'react';



function GameControlBar(props) {
  return (
    <div id="GameControlBar">
      <button id="prev-question" onClick={props.prevQuestion}>Previous question</button>
      <button id="reveal-answer" onClick={props.revealAnswer}>Reveal Answer</button>   
      <button id="next-question" onClick={props.nextQuestion}>Next question</button>
    </div>
  );
}



export default GameControlBar;

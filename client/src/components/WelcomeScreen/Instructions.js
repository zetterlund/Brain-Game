import React from 'react';
import Modal from 'components/Modal';



export default function Instructions({ handleClose, show }) {
  return (
    <Modal
      show={show}
      handleClose={handleClose}
    >
      <h2>Instructions:</h2>      
      <ol>
        <li>Using the large screen that all players will view, visit the app page and click "Create Game"</li>  
        <li>On your mobile phone, visit the app page and use the generated room code to join the game</li>
        <li>Finish setting up the game and click "Begin Game"</li>
        <li>Control the game through your mobile phone</li>
        <ul>
          <li>Ask players to raise their hand to answer each question</li>
          <li>When a student gets the correct answer, click "Reveal Answer" to reveal the answer to the class.  After, click the "plus" button to award their team a point and move to the next question.</li>
          <li>If you don't know the answer yourself, don't feel bad!  You can click the "Show Answer on Phone" button to check the answer before revealing it to the class.</li>
          <li>(You can also award negative points to a team for poor behavior or shouting the answer out loud)</li>
        </ul>
      </ol>
      <h3 className="center">Enjoy!</h3>
    </Modal> 
  );
}

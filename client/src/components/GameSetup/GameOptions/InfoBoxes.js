import React from 'react';
import Modal from 'components/Modal';



const RandomBoosts = ({ handleClose, show }) => {
  return (
    <Modal
      show={show}
      handleClose={handleClose}
    >
      <h2>Random Boosts:</h2>
      <p>When a team is awarded a point, there is a small chance they will be awarded <span className="bold">double</span> or <span className="bold">triple</span> points!</p>
    </Modal> 
  );
}

const ScoreEqualizer = ({ handleClose, show }) => {
  return (
    <Modal
      show={show}
      handleClose={handleClose}
    >
      <h2>Score Equalizer:</h2>
      <p>This feature is meant to level out the playing field.</p>
      <p>When a losing team is awarded a point, the game will occasionally give them bonus points.</p>
    </Modal> 
  );
}



export { RandomBoosts, ScoreEqualizer };

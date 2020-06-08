import React from 'react';
import { Link } from 'react-router-dom';



export default function HowItWorks() {
  return (
    <div id="HowItWorks">
      <div id="back-button">
        <Link to="/">Back to Game</Link>
      </div>
      <div id="animation-container">
        <img id="animation" src="./images/classroom_animation.gif" />
      </div>
    </div>
  );
}

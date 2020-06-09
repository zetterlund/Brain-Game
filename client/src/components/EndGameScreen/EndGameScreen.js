import React from 'react';



export default function EndGameScreen(props) {

  window.scrollTo(0, 0);

  /* Calculate which team(s) won */
  const getWinningTeams = () => {

    // Calculate high score
    const highScore = Object.values(props.teams).reduce((prev, current) => {
      return current.score > prev ? current.score : prev
    }, 0);

    // Return list of all teams with that score
    const winningTeams = Object.values(props.teams).filter(team => team.score === highScore);
    return winningTeams;
  }

  const winnerSection = () => {

    const winningTeams = getWinningTeams();

    // If there is a tie between multiple teams
    if (winningTeams.length > 1) {
      return (
        <div id="winner-section">
          <h1>Tie!</h1>
          <p>Game over</p>
        </div>
      );
    }
    // If only one team won
    else {
      const { teamName, teamColor } = winningTeams[0];
      return (
        <div id="winner-section" style={{ "--data-color": teamColor }}>
          <h1>{ teamName }</h1>
          <p>has won the game!</p>
          <div id="svg-trophy" />
        </div>      
      );      
    }
  }

  return (
    <div id="EndGameScreen">
      { winnerSection() }
      <div id="admin-bar">
        <button className="green-button" onClick={props.resetGameRequest}>Play Again</button>
        <button onClick={props.leaveRoomRequest}>Exit Game</button>
      </div>
    </div>
  );
}

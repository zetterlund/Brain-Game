import React, { Component } from 'react';



export default class EndGameScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }

  render() {
    // Calculate which team won
    const winningTeam = Object.values(this.props.teams)
      .reduce((prev, current) => {
        return current.score > prev.score ? current : prev
      });

    const { teamName, teamColor } = winningTeam;

    return (
      <div id="EndGameScreen">
        <div id="finished"></div>
        <div id="winner-section" style={{ "--data-color": teamColor }}>
          <h1>{ teamName }</h1>
          <p>has won the game!</p>
          <div id="svg-trophy" />
        </div>
        <div id="admin-bar">
          <button className="green-button" onClick={this.props.resetGameRequest}>Play Again</button>
          <button onClick={this.props.leaveRoomRequest}>Exit Game</button>
        </div>
      </div>
    );    
  }

}

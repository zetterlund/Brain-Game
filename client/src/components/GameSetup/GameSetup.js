import React, { Component, Fragment } from 'react';
import BaseUserHeader from './BaseUserHeader';
import SetupForm from './SetupForm';



export default class GameSetup extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount = () => {
    window.scrollTo(0, 0);
  }

  updateCourses = courses => {
    this.setState({ courses });
  }

  updateTeams = (teams, teamNameGenerator) => {
    this.setState({ teams, teamNameGenerator });
  }

  updateGameOptions = gameOptions => {
    this.setState({ gameOptions });
  }

  beginCompetitionRequest = event => {
    event.preventDefault();
    this.props.beginCompetitionRequest(this.state);
  }

  render = () => {
    const username = this.props.users[this.props.sid].name;
    const mobileUserInRoom = Object.keys(this.props.users).length > 1; //// Rewrite to be more specific
    const setupForm = () => (
      <SetupForm
        gameConfigObject={this.props.gameConfigObject}
        setupOptions={this.props.setupOptions}
        updateTeams={this.updateTeams}
        updateCourses={this.updateCourses}
        updateGameOptions={this.updateGameOptions}
        beginCompetitionRequest={this.beginCompetitionRequest}
        leaveRoomRequest={this.props.leaveRoomRequest}
      />      
    );
    return (
      <div id="GameSetup">
        <h2 id="page-header">Game Setup</h2>
        {this.props.userRole === 'base' &&
          <Fragment>
            <BaseUserHeader
              roomCode={this.props.roomCode}
              users={this.props.users}
              sid={this.props.sid}
            />
            {!mobileUserInRoom && setupForm()}
          </Fragment>    
        }
        {this.props.userRole === 'mobile' &&
          <Fragment>
            <p className="center">Welcome!  Your username is <span className="username">{username}</span></p>          
            {setupForm()}
          </Fragment>
        }
      </div>
    );
  }

}

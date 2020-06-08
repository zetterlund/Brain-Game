import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Instructions from './Instructions';



export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: '',
      showInstructions: false
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }  

  showInstructions = () => {
    this.setState({ showInstructions: true });
  }

  hideInstructions = e => {
    const className = e.target.getAttribute('class');
    if (className && className.includes('modal')) {
      this.setState({ showInstructions: false });
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();

    const roomCode = this.state.roomCode.toUpperCase();
    this.props.handleJoinRoomRequest(roomCode);
  }

  render = () => {
    return (
      <div id="WelcomeScreen">
        <div id="header">
          <img src="images/logo1.gif" alt="Brain Game" />          
        </div>
        <p>Welcome to the Brain Game!</p>
        <p>
          <Link to="/how-it-works">How it Works</Link>
        </p>
        <p><span className="link" onClick={this.showInstructions}>View Instructions</span></p>
        <Instructions
          show={this.state.showInstructions}
          handleClose={this.hideInstructions}
        />    
        <div id="welcome-to-the-jungle">
          <button onClick={this.props.beginSetup}>Create a new Game</button>
        </div>
        <div className="hr">
          <hr />
        </div>
        <div id="enter-room-form">
          <p>Or on your mobile device join an existing game:</p>
          <form onSubmit={this.handleSubmit}>
            <div id="room-code-row">
              <label>Room Code:</label>
              <input type="text" name="roomCode" value={this.state.roomCode} onChange={this.handleChange} />
            </div>
            <br />
            <input type="submit" value="Join game" />
          </form>
        </div>
      </div>
    )
  }

}

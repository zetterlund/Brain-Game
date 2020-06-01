import React, { Component, Fragment } from 'react';
import socketIOClient from 'socket.io-client';
import 'styles/App.scss';
import WelcomeScreen from 'components/WelcomeScreen/WelcomeScreen';
import GameSetup from 'components/GameSetup/GameSetup';
import CompetitionScreen from 'components/CompetitionScreen/CompetitionScreen';
import EndGameScreen from 'components/EndGameScreen/EndGameScreen';
import generateQuestionSet from 'functions/generateQuestionSet';
import getSetupOptions from 'functions/getSetupOptions';
import notification from 'functions/notification';

const ENDPOINT = process.env.REACT_APP_SOCKETIO_ENDPOINT;



export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gameConfigObject: null,
      gameStateObject: null,
      status: 'welcome',
      roomCode: null,
      users: {},
      sid: null,
      username: null,
      setupOptions: {
        subjects: [],
        difficulties: []
      }
    };    
  }

  componentDidMount = () => {

    getSetupOptions()
      .then(setupOptions => {
        this.setState({ setupOptions });        
      });

    // Initiate socket connection
    this.socket = socketIOClient(ENDPOINT);

    // (Print messages to console for use in debugging)
    this.socket.on('message', msg => {
      console.log('(msg):', msg);
    });

    this.socket.on('receive notification', payload => {
      this.receiveNotification(payload);
    });

    this.socket.on('load initial state', (sid, username) => {
      this.setState({ sid, username });
    });

    this.socket.on('reset game', gameConfigObject => {
      this.resetGame(gameConfigObject);
    });

    this.socket.on('begin competition', payload => {
      this.beginCompetition(payload);
    });

    this.socket.on('update user list', (updateType, socketID, username, userRole) => {
      if (updateType === 'user left') {
        this.userLeftRoom(socketID, username, userRole);
      } else if (updateType === 'user joined') {
        this.userJoinedRoom(socketID, username, userRole);
      }
    });

    this.socket.on('update game', gameUpdateObject => {
      this.updateGame(gameUpdateObject);
    });

    this.socket.on('add additional questions', result => {
      this.addAdditionalQuestions(result);
    });

    this.socket.on('end game', () => {
      this.endGame();
    });
  }

  broadcastNotification = payload => {
    this.socket.emit('broadcast notification', payload, this.state.roomCode);
  }

  receiveNotification = payload => {
    notification(...payload);
  }

  handleJoinRoomRequest = roomCode => {
    this.socket.emit('join room request', roomCode, (status, userList) => {
      switch (status) {
        case 'success':
          notification('success', 'Successfully joined room!', 4000);      
          this.setState({
            roomCode,
            userRole: 'mobile',
            status: 'setup',
            users: userList
          });
          break;
        case 'room full':
          notification('alert', `Room ${roomCode} is full :(`, 4000);  
          break;
        case 'room does not exist':
          notification('alert', `Room ${roomCode} doesn't exist :(`, 4000);   
          break;
        default:
          console.log('ERROR: In "handleJoinRoomRequest", response from server was invalid');
      }
    });
  }

  userJoinedRoom = (sid, username, userRole) => {

    // Update state to reflect new user list
    this.setState(prevState => {
      
      const users = Object.assign({}, prevState.users);
      users[sid] = {
        name: username,
        role: userRole
      };

      return ({ users })
    });

    // Display notification if someone besides user enters the room
    if (!(sid === this.state.sid)) {
      notification('success', `Mobile user ${username} connected!`, 5000);
    }
  }

  handleLeaveRoomRequest = () => {
    // Grab roomCode before resetting it
    const roomCode = this.state.roomCode;

    // Update user state to reflect leaving the room
    this.setState(
      {
        gameConfigObject: null,
        gameStateObject: null,
        status: 'welcome',
        questions: null,
        roomCode: null,
        users: {},
        userRole: null
      },
      () => {
        notification('message', `You have left room ${roomCode}`, 3000);
        this.socket.emit('leave room request', this.state.sid, roomCode);
      }
    );
  }

  userLeftRoom = (sid, username) => {

    if (this.state.users[sid].role === 'base') {
      // Make the current user leave the room if it was "base" user who left
      this.handleLeaveRoomRequest();
      notification('alert', 'The game host has left, so we\'ve returned you to the home screen.', 6000);
    } else {
      notification('message', `User ${username} has left the room`, 5000);
    }

    // Update users list in state
    this.setState(prevState => {
      const users = Object.assign({}, prevState.users);
      delete users[sid];
      return ({users});
    });
  }

  beginSetup = () => {

    this.setState(prevState => {
      return ({
        users: {
          [prevState.sid]: {
            name: prevState.username,
            role: 'base'
          }
        },
        status: 'setup'
      });
    });

    this.socket.emit('create game request', roomCode => {
      this.setState({ roomCode });
    });

  }

  handleBeginCompetitionRequest = gameSetupState => {

    // Unpack values from gameSetupState
    const { courses, teams, gameOptions, teamNameGenerator } = gameSetupState;

    // Instantiate gameConfigObject to be used for resetting the game later
    const gameConfigObject = {
      courses,
      teams,
      gameOptions,
      teamNameGenerator
    };

    // Instantiate gameStateObject
    const gameStateObject = {
      gameOptions: {...gameConfigObject.gameOptions},
      teams: [],
      questions: [],
      currentQuestionIndex: 0,
      answerRevealed: false,
      reachedMaxQuestions: false
    };

    // Configure teams
    gameStateObject.teams = [...gameConfigObject.teams];
    Object.entries(gameStateObject.teams).forEach(([i, value]) => {
      value.id = parseInt(i, 10);
      value.score = 0;
    });

    // Generate questions for the game
    const requestedQuestionCount = 10;
    const existingQuestionIDs = [];
    generateQuestionSet(courses, requestedQuestionCount, existingQuestionIDs)
      .then(({ questions, reachedMaxQuestions }) => {

        // Check if we've reached the maximum number of questions
        gameStateObject.reachedMaxQuestions = reachedMaxQuestions;

        // Append the generated questions to the end of the existing gameStateObject's questions
        gameStateObject.questions = gameStateObject.questions.concat(questions);

        // Set state locally for the initiating user
        this.beginCompetition({ gameConfigObject, gameStateObject });

        // Emit state change to all other users in room
        this.socket.emit(
          'begin competition request',
          {
            gameConfigObject,
            gameStateObject,
            roomCode: this.state.roomCode
          }
        );
      });
  }

  beginCompetition = ({ gameConfigObject, gameStateObject }) => {
    this.setState({
      gameConfigObject,
      gameStateObject,
      status: 'competition'
    });
  }

  handleUpdateGameRequest = gameUpdateObject => {

    // Set state locally for the initiating user
    this.updateGame(gameUpdateObject);

    // Emit state change to all other users in room
    this.socket.emit(
      'update game request',
      gameUpdateObject,
      this.state.roomCode
    );
  }

  updateGame = gameUpdateObject => {
    this.setState(prevState => {
      const gameStateObject = Object.assign({}, prevState.gameStateObject);
      Object.assign(gameStateObject, gameUpdateObject);
      return { gameStateObject };
    });
  }

  handleAddAdditionalQuestionsRequest = () => {
    const courses = this.state.gameConfigObject.courses;
    const requestedQuestionCount = 10;
    const existingQuestionIDs = Object.values(this.state.gameStateObject.questions).map(q => q.id);

    generateQuestionSet(courses, requestedQuestionCount, existingQuestionIDs)
      .then(result => {

        // Change state locally for the initiating user
        this.addAdditionalQuestions(result);

        // Emit the new questions to all other users in room
        this.socket.emit(
          'add additional questions request',
          result,
          this.state.roomCode
        );

      });
  }

  addAdditionalQuestions = ({ questions, reachedMaxQuestions }) => {
    const newState = Object.assign({}, this.state);
    newState.gameStateObject.questions = newState.gameStateObject.questions.concat(questions);
    newState.gameStateObject.reachedMaxQuestions = reachedMaxQuestions;
    this.setState(newState);
  }

  handleTogglePrivateAnswer = () => {
    /* Update the 'answerRevealed' value but only for the current user (the mobile user) */
    this.setState(state => {
      const gameStateObject = Object.assign({}, state.gameStateObject);
      gameStateObject.answerRevealed = !gameStateObject.answerRevealed;
      return { gameStateObject };
    });
  }

  handleEndGameRequest = () => {
    this.endGame();
    this.socket.emit('end game request', this.state.roomCode);
  }

  endGame = () => {
    this.setState({ status: 'endgame' });
  }

  handleResetGameRequest = () => {
    this.resetGame(this.state.gameConfigObject);
    this.socket.emit(
      'reset game request',
      this.state.gameConfigObject,
      this.state.roomCode
    );
  }

  resetGame = gameConfigObject => {
    this.setState(
      {
        status: 'setup',
        gameConfigObject: gameConfigObject
      },
      () => notification('message', 'Game has been reset', 2500)
    );        
  }

  render = () => (
    <Fragment>
      <nav className="navbar">
        <h1>Brain Game</h1>
      </nav>  
      <div id="App">
        {this.state.status === 'welcome' &&
          <WelcomeScreen
            handleJoinRoomRequest={(a) => this.handleJoinRoomRequest(a)}
            beginSetup={() => this.beginSetup()}
          />
        }
        {this.state.status === 'setup' && 
          <GameSetup
            setupOptions={this.state.setupOptions}
            gameConfigObject={this.state.gameConfigObject}
            allQuestions={this.state.allQuestions}
            beginCompetitionRequest={gameInfo => this.handleBeginCompetitionRequest(gameInfo)}
            roomCode={this.state.roomCode}
            users={this.state.users}
            userRole={this.state.users[this.state.sid].role}
            sid={this.state.sid}
            leaveRoomRequest={() => this.handleLeaveRoomRequest()}
          />
        }
        {this.state.status === 'competition' &&
          <CompetitionScreen
            questions={this.state.gameStateObject.questions}
            gameOptions={this.state.gameStateObject.gameOptions}
            teams={this.state.gameStateObject.teams}
            currentQuestionIndex={this.state.gameStateObject.currentQuestionIndex}
            reachedMaxQuestions={this.state.gameStateObject.reachedMaxQuestions}
            answerRevealed={this.state.gameStateObject.answerRevealed}
            userRole={this.state.users[this.state.sid].role}
            togglePrivateAnswer={() => this.handleTogglePrivateAnswer()}
            updateGameRequest={a => this.handleUpdateGameRequest(a)}
            addAdditionalQuestionsRequest={() => this.handleAddAdditionalQuestionsRequest()}
            broadcastNotification={m => this.broadcastNotification(m)}
            endGameRequest={() => this.handleEndGameRequest()}
            resetGameRequest={() => this.handleResetGameRequest()}
            leaveRoomRequest={() => this.handleLeaveRoomRequest()}
          />
        }
        {this.state.status === 'endgame' && 
          <EndGameScreen
            teams={this.state.gameStateObject.teams}
            resetGameRequest={() => this.handleResetGameRequest()}
            leaveRoomRequest={() => this.handleLeaveRoomRequest()}
          />
        }
        <footer className="footer">
            <span>Powered by Promethium</span>
            <img src="images/promethium_logo.gif" alt="Promethium" />
        </footer>
      </div>
    </Fragment>
  )
}

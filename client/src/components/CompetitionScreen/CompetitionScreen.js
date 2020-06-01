import React, { Component } from 'react';
import AdminBar from './AdminBar';
import GameControlBar from './GameControlBar';
import MobileControl from './MobileControl';
import Scoreboard from './Scoreboard';
import QuestionArea from './QuestionArea/QuestionArea';
import adjustScore from 'functions/adjustScore';
import preloadQuestionMedia from 'functions/preloadQuestionMedia';
import notification from 'functions/notification';



export default class CompetitionScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }

  componentDidUpdate = (props, state) => {

    // Check if the game has switched to a new question
    if (props.currentQuestionIndex !== this.props.currentQuestionIndex) {

      // Preload Question images
      preloadQuestionMedia(this.props);

      // Scroll to the top of the screen
      window.scrollTo(0, 0);
    }
  }

  goToQuestion = i => {
    // Check that requested question index is contained within the bounds of all the available questions
    if (0 <= i && i <= this.props.questions.length-1) {

      this.props.updateGameRequest({
        currentQuestionIndex: i,
        answerRevealed: false
      });

      // If the requested question is the last one in the set...
      if (i === this.props.questions.length-1) {
        if (!this.props.reachedMaxQuestions) {
          // If have not yet exhausted all possible questions in this game, put in a request to add more questions to the game's set
          this.props.addAdditionalQuestionsRequest();
        } else {
          // Display notification that the game is about to end
          this.props.broadcastNotification(['message', 'LAST QUESTION of the game!', 4000]);
        }
      }

    }
    // If the requested question is one after the length of all questions, end the game
    else if (i === this.props.questions.length) {
      this.props.endGameRequest();
    }
    // Catch-all for invalid requests
    else {
      notification('alert', 'Whoops!  We couldn\'t find the question you were looking for...', 5000);
    }

  }

  prevQuestion = () => {
    let i = this.props.currentQuestionIndex-1;
    this.goToQuestion(i);
  }

  nextQuestion = () => {
    let i = this.props.currentQuestionIndex+1;
    this.goToQuestion(i);
  }

  revealAnswer = () => {
    this.props.updateGameRequest({answerRevealed: true});
  }

  handleScoreChange = event => {

    // Grab information from event handler button
    const target = event.target;
    const value = target.getAttribute('data-value');
    const id = parseInt(target.getAttribute('data-id'));

    /* Adjust the team scores */
    const teams = adjustScore(this.props, value, id);

    // Propagate changes to other users
    this.props.updateGameRequest({ teams });


    //// Rewrite this to not grab from index of array, but find 'id'
    // If winning score has been reached, end the game
    if (teams.find(t => t.id === id).score >= this.props.gameOptions.pointsToWin) {
      this.props.endGameRequest();
    } 
    // If winning score has NOT been reached, continue the game
    else {
      // Move straight to the next question after awarding a point to the team
      if (value === 'plus') {
        this.nextQuestion();
      }      
    }
  }

  render = () => {
    return (
      <div id="CompetitionScreen">
        <QuestionArea
          question={this.props.questions[this.props.currentQuestionIndex]}
          answerRevealed={this.props.answerRevealed}
          onKeyPress={this.handleKeyPress}
        />
        <div id="bottom-panel">  
          <Scoreboard
            teams={this.props.teams}
            handleScoreChange={this.handleScoreChange}
          />
          {this.props.userRole === 'mobile' &&
            <MobileControl
              togglePrivateAnswer={this.props.togglePrivateAnswer}
              answerRevealed={this.props.answerRevealed}
            />
          }
          <GameControlBar
            revealAnswer={this.revealAnswer}
            nextQuestion={this.nextQuestion}
            prevQuestion={this.prevQuestion}          
          />
          <AdminBar
            resetGameRequest={this.props.resetGameRequest}
            endGameRequest={this.props.endGameRequest}
            leaveRoomRequest={this.props.leaveRoomRequest}
          />
        </div>
      </div>
    )
  }
}

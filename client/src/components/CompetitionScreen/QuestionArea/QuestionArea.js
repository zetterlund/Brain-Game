import React, { Component } from 'react';
import AnswerArea from './AnswerArea';
import StandardQuestion from './StandardQuestion';
import MathematicsQuestion from './MathematicsQuestion';
import JeopardyQuestion from './JeopardyQuestion';
import StandardImageQuestion from './StandardImageQuestion';
import MultipleChoiceImageQuestion from './MultipleChoiceImageQuestion';
import MultipleChoiceStandardQuestion from './MultipleChoiceStandardQuestion';



class QuestionArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questionRefreshed: false
    }
  }

  componentDidMount = () => {
    this.refreshTransition();
  }
  componentDidUpdate = (props, state) => {
    if (props.question.id !== this.props.question.id) {
      this.refreshTransition();
    }
  }

  /* Used for 'refreshing' react-transition-group CSS transition triggers when going between questions */
  refreshTransition = () => {
    this.setState(
      { questionRefreshed: false },
      () => {this.setState({ questionRefreshed: true })}
    );
  }

  render = () => {
    const format = this.props.question.format;
    return (
      <div id="QuestionArea" data-format={format}>

        {format === 'standard' &&
          <StandardQuestion
            question={this.props.question}
            answerRevealed={this.props.answerRevealed}
          />
        }
        {format === 'mathematics' &&
          <MathematicsQuestion
            question={this.props.question}
            answerRevealed={this.props.answerRevealed}
          />          
        }
        {format === 'jeopardy' &&
          <JeopardyQuestion
            question={this.props.question}
            answerRevealed={this.props.answerRevealed}
          />          
        }
        {format === 'standardImage' &&
          <StandardImageQuestion
            question={this.props.question}
            questionRefreshed={this.state.questionRefreshed}            
            answerRevealed={this.props.answerRevealed}
          />          
        }
        {format === 'multipleChoiceImage' &&
          <MultipleChoiceImageQuestion
            format={format}
            question={this.props.question}
            questionRefreshed={this.state.questionRefreshed}
            answerRevealed={this.props.answerRevealed}
          />          
        }
        {format === 'multipleChoiceStandard' &&
          <MultipleChoiceStandardQuestion
            format={format}
            question={this.props.question}
            questionRefreshed={this.state.questionRefreshed}
            answerRevealed={this.props.answerRevealed}
          />
        }

        <AnswerArea
          answerRevealed={this.props.answerRevealed}
          answer={this.props.question.answer}
          format={format}
        />              
      </div>
    );
  }

}



export default QuestionArea;

import React from 'react';
import { CSSTransition } from 'react-transition-group';
import MathJax from 'react-mathjax2';
import MathDisplay from './MathDisplay';



export default function AnswerArea(props) {

  /* Display text differently for various formats */
  const answerContent = () => {
    if (props.format === 'mathematics') {
      return (
        <MathDisplay>
          <MathJax.Text text={ `$$${props.answer}$$` } />
        </MathDisplay>
      );
    } else {
      return props.answer;
    }    
  }

  return (
    <div className="answer">
      <CSSTransition
        in={props.answerRevealed}
        classNames="answer"
        mountOnEnter={true}
        unmountOnExit={true}
        timeout={{
          enter: 500,
          exit: 0
        }}
      >
        <div>
          <div className="answer-label">Answer:</div>
          <div className="answer-content">{answerContent()}</div>
        </div>
      </CSSTransition>
    </div>
  );
}

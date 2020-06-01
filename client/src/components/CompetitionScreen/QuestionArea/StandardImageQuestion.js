import React, { Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';

const IMG_URI_PREFIX = process.env.REACT_APP_IMG_URI_PREFIX;



export default function StandardImageQuestion(props) {
  const q = props.question;
  return (
    <Fragment>
      <div className="question-text">{q.question}</div>
      <div className="media-row">
        <CSSTransition
          timeout={700}
          in={props.questionRefreshed}
          mountOnEnter={true}
          unmountOnExit={true}
          classNames="question-image"        
        >
          <div className="media-container">
            <img className="question-image" src={ `${IMG_URI_PREFIX}images/${q.mediaURL}` } alt="" />
          </div>
        </CSSTransition>
      </div>
    </Fragment>
  );
}

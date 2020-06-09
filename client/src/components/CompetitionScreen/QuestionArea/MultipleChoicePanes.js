import React from 'react';
import { CSSTransition } from 'react-transition-group';

const IMG_URI_PREFIX = process.env.REACT_APP_IMG_URI_PREFIX;



export default function MultipleChoicePanes(props) {

  /* Format the panes based on the format of the question */
  const paneItem = (choice) => {
    if (props.format === 'multipleChoiceImage') {
      return (
        <img className="question-image" src={ `${IMG_URI_PREFIX}images/${choice.mediaURL}` } alt="" />
      );
    }
    if (props.format === 'multipleChoiceStandard') {
      return (
        <div className="choice-text">{choice.text}</div>
      );
    }
  }

  return (
    <div id="MultipleChoicePanes">
      {Object.values(props.choices).map(c => (
        <div key={c.choiceID} className="pane-container">
          <CSSTransition
            key={c.choiceID}
            timeout={0}
            classNames={`transition-pane-${c.choiceID}`}
            in={props.questionRefreshed}
          >
            <div className="pane">
              <div className="choice-label">{c.label}</div>
              <div className="choice-content">{paneItem(c)}</div>
            </div>
          </CSSTransition>
        </div>
      ))}
    </div>
  );
}

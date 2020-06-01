import React, { Fragment } from 'react';
import MathJax from 'react-mathjax2';
import MathDisplay from './MathDisplay';



export default function MathematicsQuestion(props) {
  const q = props.question;
  return (
    <Fragment>
      <MathDisplay>
        <div className="question-text">
          <MathJax.Text text={ `$$${q.question}$$` } />
        </div>
      </MathDisplay>
    </Fragment>
  );
}

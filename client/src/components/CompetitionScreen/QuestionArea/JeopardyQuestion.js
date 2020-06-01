import React, { Fragment } from 'react';



export default function JeopardyQuestion(props) {
  const q = props.question;
  return (
    <Fragment>
      <div className="question-text">{q.question}</div>
      <div className="tagline">(Jeopardy Topic: {q.tagline})</div>
    </Fragment>  
  );
}

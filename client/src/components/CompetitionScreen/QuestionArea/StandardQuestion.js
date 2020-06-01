import React from 'react';



export default function StandardQuestion(props) {
  const q = props.question;
  return (
    <div className="question-text">{q.question}</div>
  );
}

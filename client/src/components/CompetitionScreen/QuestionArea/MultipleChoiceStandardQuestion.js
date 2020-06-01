import React, { Fragment } from 'react';
import MultipleChoicePanes from './MultipleChoicePanes';



export default function MultipleChoiceImageQuestion(props) {
  const q = props.question;
  return (
    <Fragment>
      <div className="question-text">{q.question}</div>
      <MultipleChoicePanes
        choices={q.choices}
        questionRefreshed={props.questionRefreshed}
        format={props.format}
      />
    </Fragment>
  );
}

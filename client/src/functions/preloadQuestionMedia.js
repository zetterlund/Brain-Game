const IMG_URI_PREFIX = process.env.REACT_APP_IMG_URI_PREFIX;



function preloadQuestionMedia(props) {
  const nextQuestion = props.questions[props.currentQuestionIndex + 1];
  // Check if next question exists
  if (nextQuestion) {
    if (nextQuestion.format === 'standardImage') {
      (new Image()).src = `${IMG_URI_PREFIX}images/${nextQuestion.mediaURL}`;
    }
    if (nextQuestion.format === 'multipleChoiceImage') {
      Object.values(nextQuestion.choices).forEach(c => {
        (new Image()).src = `${IMG_URI_PREFIX}images/${c.mediaURL}`;
      });
    }
  }
}



export default preloadQuestionMedia;


/* Occasionally give bonus points for a correct answer */
function getRandomBoost() {

  // Define the probability of whether to execute the random boost
  const probability = 0.2;

  if (Math.random() < probability) {
    return 1;
  } else {
    return 0;
  }
}



/* Occasionally equalize the score by awarding bonus points to last-place team */
function equalizeScore(teams, id) {

  // Define the probability of whether to execute the score equalization
  const probability = 0.5;

  if (Math.random() < probability) {

    // (Identify the team whose score is being adjusted)
    const team = teams.find(t => t.id === id);

    // If the answering team was in last place, give them an extra point
    const lowestScore = Math.min(...teams.map(t => t.score));
    if (team.score === lowestScore) {
      team.score ++;
    }
  }

  return teams;
}



export default function adjustScore(props, value, id) {

    let teams = [...props.teams];

    /* Adjust team's points */
    if (value === 'plus') {

      // Set standard point increment (1 point)
      let points = 1;

      // If "Random Boost" is enabled, add it
      points += props.gameOptions.includeRandomBoosts ? getRandomBoost() : 0;
      teams[id].score += points;

      // If "Score Equalizer" is enabled, execute it
      teams = props.gameOptions.includeScoreEqualizer ? equalizeScore(teams, id) : teams;

    } else if (value === 'minus') {
      teams[id].score -= 1;
    }

    return teams;
}

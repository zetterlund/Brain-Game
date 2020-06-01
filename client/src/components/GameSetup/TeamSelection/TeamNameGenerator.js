import allTeams from './TeamNameSets';



function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}



export default function teamNameGenerator() {
  /* Randomly select a theme for the team names */
  const t = Object.keys(allTeams);
  const theme = t[Math.floor( Math.random() * t.length )];
  const teams = Object.entries(allTeams[theme]);

  /* If certain theme was selected, shuffle items */
  if (theme === 'Colors') {
    shuffle(teams);
  }

  let index = 0;
  const teamNameIterator = {
    next: function() {
      let result;
      if (index < teams.length) {
        result = teams[index];
        index++;
        return result;
      }
      return ['New Team', null];
    }
  };
  return teamNameIterator;
}

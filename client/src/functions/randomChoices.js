function randomChoice(p) {
  let rnd = p.reduce( (a, b) => a + b ) * Math.random();
  return p.findIndex( a => (rnd -= a) < 0 );
}

function randomChoices(p, count) {
  return Array.from(Array(count), randomChoice.bind(null, p));
}



export default randomChoices;

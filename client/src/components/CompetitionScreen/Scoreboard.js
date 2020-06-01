import React from 'react';



function Scoreboard(props) {
  return (
    <div id="Scoreboard">
      {Object.values(props.teams).map(team => {
        return (
          <div key={team.id} className="score-box" style={{ "--data-color": team.teamColor }}>
            <div className="content">
              <div className="score">{team.score}</div>
              <div className="increment-buttons">
                <input
                  type="button"
                  value="+"
                  data-id={team.id}
                  data-value="plus"
                  onClick={props.handleScoreChange}
                />
                <input
                  type="button"
                  value="–"
                  data-id={team.id}
                  data-value="minus"
                  onClick={props.handleScoreChange}
                />              </div>
            </div>           
            <div className="team-name">{team.teamName}</div>
          </div>
        );
      })}
    </div>
  )
}


                // <button data-id={team.id} value="minus" onClick={props.handleScoreChange} />



export default Scoreboard;

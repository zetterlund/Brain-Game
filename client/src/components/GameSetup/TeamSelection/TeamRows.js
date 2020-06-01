import React, { Fragment } from 'react';



export default function TeamRows(props) {
  return (
    Object.entries(props.teams).map(([i, team]) => {
      return (
        <Fragment key={i}>
          <div>
            <input
              type="text"
              data-index={i}
              // data-option="teamName"
              name="teamName"
              maxLength="40"
              style={{ "--data-color": team.teamColor }}
              value={team.teamName}
              onChange={props.handleChange}
            />
          </div>
          <div>
            <input
              type="number"
              data-index={i}
              // data-option="playerCount"
              name="playerCount"
              min="1"
              style={{ "--data-color": team.teamColor }}
              value={team.playerCount} // When processing form, if going by DOM instead of through components, make sure that this value is truly updated when changed
              onChange={props.handleChange}
            />
          </div>
          <div className="delete">
            <button onClick={() => {props.removeTeam(i)}}>
              <i className="fa fa-border fa-close"></i>
            </button>
          </div>        
        </Fragment>
      )
    })
  )
}

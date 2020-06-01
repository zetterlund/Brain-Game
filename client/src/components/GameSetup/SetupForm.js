import React, { Fragment } from 'react';
import CourseSelection from './CourseSelection/CourseSelection';
import TeamSelection from './TeamSelection/TeamSelection';
import GameOptions from './GameOptions/GameOptions';



export default function SetupForm(props) {

  const {
    gameConfigObject,
    setupOptions,
    updateTeams,
    updateCourses,
    updateGameOptions,
    beginCompetitionRequest,
    leaveRoomRequest
  } = props;

  return (
    <Fragment>
      <div className="flex-container">
        <TeamSelection
          initialTeams={gameConfigObject != null ? gameConfigObject.teams : null}
          initialTeamNameGenerator={gameConfigObject != null ? gameConfigObject.teamNameGenerator : null}
          updateTeams={updateTeams}
        />
        <CourseSelection
          initialCourses={gameConfigObject != null ? gameConfigObject.courses : null}
          setupOptions={setupOptions}
          updateCourses={(x) => updateCourses(x)}
        />
      </div>
      <GameOptions
        initialConfig={gameConfigObject != null ? gameConfigObject.gameOptions : null}
        updateGameOptions={(x) => updateGameOptions(x)}
      />
      <button className="green-button" onClick={beginCompetitionRequest}>Begin Competition</button>
      <button id="leave-room" onClick={() => leaveRoomRequest()}>Leave room</button>            
    </Fragment>
  );
  
}

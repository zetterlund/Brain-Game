import React, { Component } from 'react';
import TeamRows from './TeamRows';
import teamNameGenerator from './TeamNameGenerator';
import notification from 'functions/notification';



export default class TeamSelection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };

    /* Iterator for generating team name when adding a new team */
    this.teamNameGenerator = this.props.initialTeamNameGenerator ? this.props.initialTeamNameGenerator : teamNameGenerator();
  }

  componentDidMount = () => {
    this.setInitialTeams();
  }

  componentDidUpdate = (prevProps, prevState) => {
    // Propagate state changes up to parent component
    // // (For some reason, updates are resulting in changes to props)
    // // if (prevProps !== this.props) {
    // //   console.log('prevProps:', prevProps, 'this.props:', this.props);
    // // }
    if (prevState !== this.state) {
      this.props.updateTeams(this.state.teams, this.teamNameGenerator);
    }
  }

  setInitialTeams = () => {
    // Check if "initialTeams" was provide to props.  If so, load that.  If not, generate initial teams.
    if (this.props.initialTeams) {
      this.setState({ teams: this.props.initialTeams });
    } else {
      for (let x=0; x<3; x++) { // Create three teams
        this.addTeam();
      }
    }
  }

  addTeam = () => {

    let [teamName, teamColor] = this.teamNameGenerator.next();
    if (!teamColor) {
      teamColor = "#FFFFFF";
    }
    const team = { teamName, teamColor, playerCount: 3 };

    this.setState(state => ({ teams: [...state.teams, team] }));
  }

  removeTeam = index => {
    // Check if there are only two teams available
    if (this.state.teams.length === 2) {
      notification('message', 'You must include at least 2 teams in the game.  It wouldn\'t be much fun with just one team!', 5000);
    } else {
      this.setState(state => {
        let teams = [...state.teams];
        teams.splice(index, 1);
        return { teams };
      });
    }
  }

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const index = target.getAttribute('data-index');

    // Set value's data type depending on which property has been changed
    const value = name === 'playerCount' ? parseInt(target.value, 10) : target.value;

    this.setState(prevState => {
      const teams = [...prevState.teams];
      teams[index][name] = value;
      return { teams };
    });
  }

  render() {
    return(
      <div>
        <div className="center">
          <button onClick={this.addTeam}>Add a Team</button>
        </div>
        {this.state.teams !== null &&
          <div id="team-selection">
            <div>Team Name</div>
            <div>Players</div>
            <div></div>
            <TeamRows
              teams={this.state.teams}
              removeTeam={this.removeTeam}
              handleChange={this.handleChange}
            />
          </div>
        }
      </div>
    );
  }
}

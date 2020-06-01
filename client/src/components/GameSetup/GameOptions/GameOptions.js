import React, { Component, Fragment } from 'react';
import PointsToWin from './PointsToWin';
import RandomBoosts from './RandomBoosts';
import ScoreEqualizer from './ScoreEqualizer';



class GameOptions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pointsToWin: 10,
      includeRandomBoosts: false,
      includeScoreEqualizer: true,
    };
  }

  componentDidMount = () => {
    this.setInitialGameOptions();
  }

  setInitialGameOptions = () => {
    // Check if "initialConfig" was provide to props.  If so, load that.
    if (this.props.initialConfig) {
      this.setState(
        this.props.initialConfig,
        () => {this.props.updateGameOptions(this.state)}
      );
    } else {
      this.props.updateGameOptions(this.state);
    }
  }

  handleChange = event => {
    let target = event.target;
    let value = target.name === 'pointsToWin' ? parseInt(target.value, 10) : target.checked;
    this.setState(
      {[target.name]: value},
      () => {this.props.updateGameOptions(this.state)}
    );
  }

  render = () => (
    <Fragment>
      <h4>Game Options:</h4>
      <div id="GameOptions">
        <PointsToWin
          pointsToWin={this.state.pointsToWin}
          handleChange={this.handleChange}
        />
        <RandomBoosts
          includeRandomBoosts={this.state.includeRandomBoosts}
          handleChange={this.handleChange}
        />
        <ScoreEqualizer
          includeScoreEqualizer={this.state.includeScoreEqualizer}
          handleChange={this.handleChange}
        />
      </div>
    </Fragment>
  )

}



export default GameOptions;

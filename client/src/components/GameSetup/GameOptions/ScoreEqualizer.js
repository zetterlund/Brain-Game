import React, { Component, Fragment } from 'react';
import { ScoreEqualizer as InfoBox } from './InfoBoxes';



class ScoreEqualizer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showInfoBox: false
    };
  }

  showInfoBox = () => {
    this.setState({ showInfoBox: true });
  }

  hideInfoBox = e => {
    const className = e.target.getAttribute('class');
    if (className && className.includes('modal')) {
      this.setState({ showInfoBox: false });
    }
  }

  render = () => {
    return (
      <Fragment>
        <div>
          <label>Include score equalizer:</label>
          <span className="link infobox-link" onClick={this.showInfoBox}></span>
          <InfoBox
            show={this.state.showInfoBox}
            handleClose={this.hideInfoBox}
          />
        </div>
        <input
          type="checkbox"
          name="includeScoreEqualizer"
          checked={this.props.includeScoreEqualizer}
          onChange={this.props.handleChange}
        />
      </Fragment>
    );
  }
}



export default ScoreEqualizer;

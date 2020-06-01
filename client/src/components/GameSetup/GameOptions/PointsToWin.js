import React, { Fragment } from 'react';



const PointsToWin = ({ pointsToWin, handleChange }) => {
  return (
    <Fragment>
      <div>
        <label>Points to win:</label>
      </div>
      <input
        type="number"
        min="1"
        max="100"
        name="pointsToWin"
        value={pointsToWin}
        onChange={handleChange}
      />
    </Fragment>
  );
}



export default PointsToWin;

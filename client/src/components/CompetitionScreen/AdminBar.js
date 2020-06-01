import React from 'react';



function AdminBar(props) {
  return (
    <div id="AdminBar">
      <button onClick={props.resetGameRequest}>Reset game</button>
      <button onClick={props.endGameRequest}>End game</button>
      <button onClick={props.leaveRoomRequest}>Exit game</button>
    </div>    
  );
}



export default AdminBar;

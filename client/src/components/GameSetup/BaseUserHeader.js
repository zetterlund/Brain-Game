import React, { Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import MobileStatus from './MobileStatus';



export default function BaseUserHeader(props) {
  return (
    <Fragment>
      <div className="room-code">
        <span>Your room code</span>
        <CSSTransition
          in={props.roomCode !== null}
          classNames="room-code"
          timeout={1300}
        >
          <span>{props.roomCode}</span>
        </CSSTransition>
      </div>
      <MobileStatus
        users={props.users}
        sid={props.sid}
      />    
    </Fragment>
  );
}

import React from 'react';
import { CSSTransition } from 'react-transition-group';



export default function MobileStatus({ users, sid }) {
  let mobileUsername;
  if (Object.keys(users).length > 1) {
    mobileUsername = users[Object.keys(users).find(x => x !== sid)].name;
  }
  return (
    <div id="MobileStatus">
      <CSSTransition
        classNames="no-mobile"
        timeout={{
          enter: 0,
          exit: 500
        }}
        mountOnEnter={true}
        unmountOnExit={true}
        in={Object.keys(users).length === 1}
      >
        <span id="no-mobile">(No mobile users have yet connected)</span>
      </CSSTransition>
      <CSSTransition
        timeout={{
          enter: 500,
          exit: 0
        }}
        in={Object.keys(users).length > 1}
        mountOnEnter={true}
        unmountOnExit={true}
        classNames="has-mobile"
      >
        <span id="has-mobile">Mobile user <span className="username">{mobileUsername}</span> has joined and is setting up the game!</span>
      </CSSTransition>
    </div>
  );
}

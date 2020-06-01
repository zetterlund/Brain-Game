import React from 'react';



function CourseRows(props) {
  return (
    Object.entries(props.courses).map(([i, course]) => {
      return (
        <div className="course-item" key={i}>
          <div className="subject" data-label="Subject">
            <select
              name="subject"
              value={course.subject}
              data-index={i}
              data-option="subject"
              onChange={props.handleChange}
            >
              {props.setupOptions.subjects.map(c => <option key={c.toString()} value={c}>{c}</option> )}
            </select>
          </div>
          <div className="difficulty" data-label="Difficulty">
            {Object.values(props.setupOptions.difficulties).map(x => {
              let checkedStatus = course.difficulty.includes(x) ? true : false;
              let id = `difficulty-${i}-${x}`;
              return (
                <div className="difficulty-checkbox" key={x.toString()}>
                  <input
                    type="checkbox"
                    data-index={i}
                    data-option="difficulty"
                    name="difficulty"
                    id={id}
                    value={x}
                    checked={checkedStatus}
                    onChange={props.handleChange}
                  />
                  <label htmlFor={id}>{x}</label>
                </div>
              );
            })}
          </div>
          <div className="frequency" data-label="Frequency">
            <div className="frequency-slider">
              <input
                type="range"
                data-index={i}
                name="frequency"
                data-option="frequency"
                value={course.frequency}
                min="0"
                max="30"
                onChange={props.handleChange}
              />
            </div>
          </div>
          <div className="delete" data-label="Delete">
            <button onClick={() => {props.removeCourse(i)}}><i className="fa fa-border fa-close"></i></button>
            </div>
        </div>
      )
    })
  )
}



export default CourseRows;

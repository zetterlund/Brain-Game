import React, { Component } from 'react';

import CourseRows from './CourseRows';
import notification from 'functions/notification';



class CourseSelection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: null
    };
  }

  componentDidMount = () => {
    this.setInitialCourses();
  }

  componentDidUpdate = (prevProps, prevState) => {
    // Propagate state changes up to parent component
    // For some reason, updates are resulting in changes to props, so check if changes are made to state
    if (prevState !== this.state) {
      this.props.updateCourses(this.state.courses);
    }
  }

  setInitialCourses = () => {
    // Check if "initialCourses" was provide to props.  If so, load that.  If not, set default initial values.
    if (this.props.initialCourses) {
      this.setState({ courses: this.props.initialCourses });
    } else {
      this.setState(
        {courses: [
          {
            subject: 'Math',
            difficulty: [2, 3, 4],
            frequency: 10,
          },
          {
            subject: 'Geography',
            difficulty: [2, 3, 4],
            frequency: 10,
          },
          {
            subject: 'Trivia',
            difficulty: [2, 3, 4],
            frequency: 10,
          },                    
        ]}
      );
    }
  }

  addCourse = () => {
    const courseTemplate = {      
      subject: 'Math',
      difficulty: [2, 3, 4],
      frequency: 10,
    };
    this.setState(state => ({ courses: [...state.courses, courseTemplate] }));
  }

  removeCourse = index => {
    // Check if only one course remains
    if (this.state.courses.length === 1) {
      notification('message', 'You must include at least one course... How else will we know which questions to show you?', 5000);
    } else {
      this.setState(
        state => {
          let courses = [...state.courses];
          courses.splice(index, 1);
          return { courses }
        }
      );      
    }
  }

  handleChange = event => {
    const target = event.target;

    // Figure out which property is being modified
    const property = target.getAttribute('data-option');

    if (property === 'difficulty') { // If 'difficulty' is being modified
      const value = parseInt(target.value, 10);
      const checkedStatus = target.checked;
      this.setState(state => {

        // Instantiate a new copy of courses so as to not modify state directly
        const newCourses = [...state.courses];

        // Retrieve the course being modified
        const course = newCourses[target.getAttribute('data-index')];

        // Retrieve the current component values
        const difficulties = [...course[property]];

        // Add or remove value, based on if box was checked
        const newDifficulties = checkedStatus ? difficulties.concat([value]) : difficulties.filter(x => x !== value);
        
        course[property] = newDifficulties;
        return { courses: newCourses };

      });
    } else { // Catch-all for all other properties

      // Convert "value" datatype if necessary
      const value = property === 'frequency' ? parseInt(target.value, 10) : target.value;

      this.setState(state => {
        const newCourses = [...state.courses];
        const course = newCourses[target.getAttribute('data-index')];
        course[property] = value;
        return { courses: newCourses };
      });     
    }
  }

  render() {
    return(
      <div>
        <div className="center">
          <button onClick={this.addCourse}>Add a Question Set</button>
        </div>
        {this.state.courses != null &&
          <div id="course-selection">
            <CourseRows
              courses={this.state.courses}
              setupOptions={this.props.setupOptions}
              removeCourse={this.removeCourse}
              handleChange={this.handleChange}
            />
          </div>
        }
      </div>
    );
  }

}



export default CourseSelection;

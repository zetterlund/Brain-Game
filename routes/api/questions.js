const express = require('express');
const router = express.Router();

/* Database object */
const db = require('../../config/db');



/* Helper functions */
function randomSample (samples) {
  let sample = Math.random() * samples.reduce((sum, { weight }) => sum + weight, 0);
  // first sample n where sum of weight for [0..n] > sample
  const { value } = samples.find(
    ({ weight }) => (sample -= weight) < 0
  );
  return value;
}
function getRandom(arr, n) {
  let len = arr.length;
  const taken = new Array(len);
  if (n > len) {
    throw new RangeError("getRandom: more elements taken than available");
  }
  const result = new Array(n);  
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}



/* A function to take "frequency" of each course and generate "courseCounts" object based on distribution (e.g. { '1': 6, '2': 4 }) */
function generateCourseCounts(courses, requestedQuestionCount) {

  const samples = [];
  Object.values(courses).forEach(c => {
    samples.push({
      value: c.id,
      weight: c.frequency
    });
  });
  const courseCounts = {};
  Object.values(courses).forEach(c => {
    courseCounts[c.id] = 0;
  });
  Array.from({ length: requestedQuestionCount }, () => randomSample(samples)).forEach(value => {
    courseCounts[value]++;
  });
  return courseCounts;
}



/* A promise to retrieve questions for a single course */
const getCourseQuestions = (course, courseCounts, existingQuestionIDs) => {
  return new Promise((resolve, reject) => {
    
    db.get().collection('questions')
      /* First, we get an array of the ID of every question in database that matches the course specifications, while NOT being in the current "existingQuestionIDs" array */
      .find({ 'subject': course.subject, 'difficulty': { $in: course.difficulty }, 'id': { $nin: existingQuestionIDs } })
      .project({ 'id': 1, '_id': 0 })
      .toArray((err, questionIDs) => {

        /* Now we take the available questions and retrieve a random sample whose length is the required number of questions for this course */

        // (Transform result from array of objects into array of IDs)
        const availableQuestions = questionIDs.map(x => x.id);

        // Define just how many questions we need
        let sampleCount = courseCounts[course.id];

        // Check if the number of questions we are going to request a sample of exceeds the number of available questions to choose from
        let reachedMaxQuestions = false;
        if (sampleCount > availableQuestions.length) {
          sampleCount = availableQuestions.length;
          reachedMaxQuestions = true;
        }

        // Select the random sample
        const sampledQuestions = getRandom(availableQuestions, sampleCount);

        // Retrieve the exact questions we want from the database
        db.get().collection('questions')
          .find({ 'id': { $in: sampledQuestions } })
          .project({ '_id': 0 })
          .limit(courseCounts[course.id])
          .toArray((err, questions) => {
            resolve({ questions, reachedMaxQuestions });
          });
      
      });
  });
}



/* Route: generateQuestions */
router.post('/generateQuestions', (req, res) => {

  const { courses, requestedQuestionCount, existingQuestionIDs } = req.body;

  // Assign an "id" property to each course.  (This route could probably be re-written without this "id" property - but hey, I'm going to leave it like it is for now!)
  Object.values(courses).forEach((c, i) => {
    c.id = i+1;
  });

  // Generate course counts
  const courseCounts = generateCourseCounts(courses, requestedQuestionCount);

  // Initiate question generation promises for each course
  const allPromises = [];
  Object.values(courses).forEach(course => {
    allPromises.push(getCourseQuestions(course, courseCounts, existingQuestionIDs));
  });
  Promise.all(allPromises)
    .then(results => {

      /* First, combine the questions */
      // Combine the questions from the different courses
      let questions = results.reduce((acc, cur) => acc.concat(cur.questions), []);
      // Remove duplicates
      questions = questions.reduce((acc, cur) => {
        return (acc.map(x => x.id).includes(cur.id) ? acc : [...acc, cur]);
      }, []);
      // Shuffle the order of the questions
      shuffle(questions);

      /* Second, determine if we've reached the bottom of the question bucket for any course */
      const reachedMaxQuestions = Object.values(results).map(r => r.reachedMaxQuestions).includes(true);

      // Return results to client
      res.send({ questions, reachedMaxQuestions });
    })
    .catch(e => console.log('e triggered! e:', e));

});



module.exports = router;

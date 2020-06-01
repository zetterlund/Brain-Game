const express = require('express');
const router = express.Router();

/* Database object */
const db = require('../../config/db');



router.get('/', async (req, res) => {

  const setupOptions = {};

  /* Get subjects */
  setupOptions.subjects = await db.get().collection('questions')
    .distinct('subject');

  /* Get difficulties */
  setupOptions.difficulties = await db.get().collection('questions')
    .distinct('difficulty');

  /* Return response to client */
  res.send(setupOptions);

});



module.exports = router;

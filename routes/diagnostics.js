const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)))
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file 
  console.log(req.body);
  const { isValid, errors } = req.body; 

  const newDiagnostic = {
    time: Date.now(),
    error_id:uuidv4(),
    errors, 
  }

  if (!isValid) {
    readAndAppend(newDiagnostic, './db/diagnostics.json'); 
    res.json('Diagnostic data added.'); 
  } else {
    res.json({
      message: 'Object is valid, not logging.', 
      error_id: newDiagnostic.error_id, 
    })
  }
});

module.exports = diagnostics;

const express = require('express');
const path = require('path');
const githubHelpers = require('../helpers/github.js');
const db = require('../database/index.js');

let app = express();

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

app.use(express.static(path.join(__dirname,'..','client/dist')));

app.use(express.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.username;
  //call getReposByUsername
  githubHelpers.getReposByUsername(username, (err, repos) => {
    if (err) {
      res.status(404).send('Unable to get repos from github');
      console.log('github API retrieval error: ', err);
      return;
    }
    // if no error call db.save on repos
    console.log('able to get repos fromm github: ', repos);
    db.save(username, repos, (err) => {
      if (err) {
        res.status(500).send('Unable to add repos to database');
        console.log('database posting error: ',err);
        return;
      }
      //if no error, pass success to client
      console.log('Success posting repos fromm github');
      res.status(201).end();
    });
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


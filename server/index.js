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
    console.log('able to get repos fromm github');
    db.save(username, repos)
    .then(() => {
      console.log('Success posting repos fromm github');
      res.status(201).end();
    }).catch((err) => {
      res.status(500).send('Unable to add repos to database');
      console.log('database posting error: ', err);
    });
  });
});

app.get('/repos/top25', function (req, res) {
  // TODO - your code here!
  // db.findTop25Repos((err, repos) => {
  //   if (err) {
  //     res.status(500).send('Unable to obtain repos from server');
  //     return;
  //   }
  //   res.status(200).send(repos);
  // });
  db.findTop25Repos()
  .then((repos) => {
    res.status(200).send(repos);
  }).catch((err) => {
    res.status(500).send('Unable to obtain repos from server');
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


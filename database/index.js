const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const RepoSchema = new mongoose.Schema({
  // TODO: your schema here!
  node_id: String,
  name: String,
  full_name: String,
  html_url: String,
  stargazers_count: Number,
  forks_count: Number,
  owner_login: String
});

const ReposSchema = new mongoose.Schema({
  //TODO: my schema here!
  username: String,
  repos: [RepoSchema]
});

const Repos = mongoose.model('Repos', ReposSchema);

const save = (username, repos, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // remove duplicates from repos, and update repo objects to only store required properties
  let mappedRepos = repos.map((repo) => {
    let { node_id, name, full_name, html_url, stargazers_count, forks_count, owner } = repo;
    let owner_login = owner.login;
    return { node_id, name, full_name, html_url, stargazers_count, forks_count, owner_login }
  });
  let idOnlyRepos = mappedRepos.map((repo) => {
    return repo.node_id;
  });
  let filteredRepos = mappedRepos.filter((repo, index) => {
    return idOnlyRepos.indexOf(repo.node_id) === index;
  });
  // find user's repos already in database if exists
  Repos.findOne({ username }, (err, doc) => {
    if (err || !doc) {
      if (err) {
        console.log('Error findine username', err.name);
      }
      //create new instance of Repos for user
      let userRepos = new Repos;
      //add username property
      userRepos.username = username;
      //iterate over filtered repos and add each to repos property of userRepos
      for (let repo of filteredRepos) {
        userRepos.repos.push(repo);
      }
      userRepos.save(callback);
      return;
    }
    //if user already exists, replace the repo subdocuments for user with latest ones
    doc.repos = filteredRepos;
    doc.save(callback);
  });
};

const findTop25Repos = (callback) => {
  Repos.find({}, (err, documents) => {
    if (err) {
      callback(err);
      return;
    }
    let top25Repos = [];
    for (let document of documents) {
      for (let repo of document.repos) {
        let repoAdded = false;
        for (let i = 0; i < top25Repos.length; i++) {
          if (repo.stargazers_count >= top25Repos[i].stargazers_count) {
            for (let j = top25Repos.length; j > i; j--) {
              top25Repos[j] = top25Repos[j - 1];
            }
            top25Repos[i] = repo;
            if (top25Repos.length > 25) {
              top25Repos.pop();
            }
            repoAdded = true;
            break;
          }
        }
        if (!repoAdded && top25Repos.length < 25) {
          top25Repos.push(repo);
        }
      }
    }
    callback(null, top25Repos);
  });
}

module.exports.save = save;
module.exports.findTop25Repos = findTop25Repos;
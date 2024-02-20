const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const RepoSchema = new mongoose.Schema({
  // TODO: your schema here!
  node_id: String,
  name: String,
  html_url: String,
  stargazers_count: Number
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
    let { node_id, name, html_url, stargazers_count } = repo;
    return { node_id, name, html_url, stargazers_count }
  });
  let idOnlyRepos = mappedRepos.map((repo) => {
    return repo.node_id;
  });
  let filteredRepos = mappedRepos.filter((repo, index) => {
    return idOnlyRepos.indexOf(repo.node_id) === index;
  });

  // create instance of Repos
  let userRepos = new Repos;
  //add username property
  userRepos.username = username;
  //iterate over filtered repos and add each to repos property of userRepos
  for (let repo of filteredRepos) {
    userRepos.repos.push(repo);
  }
  userRepos.save(callback);
};

module.exports.save = save;
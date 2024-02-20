import React from 'react';
import Repo from './Repo.jsx';

const RepoList = ({ repos }) => {
  const renderRepos = (repos) => {
    let repoElements = [];
    for (let repo of repos) {
      repoElements.push(<Repo repo={repo}/>);
    }
    return repoElements;
  };
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {repos.length} repos.
      {renderRepos(repos)}
    </div>
  );
};

export default RepoList;
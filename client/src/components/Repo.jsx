import React from 'react';

const Repo = ({ repo }) => {
  let name = repo.full_name;
  let url = repo.html_url;
  return (
    <div>
      <a href={url}>{name}</a>
    </div>
  );
};

export default Repo;
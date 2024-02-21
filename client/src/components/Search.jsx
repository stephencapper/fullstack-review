import React, { useState } from 'react';

const Search = ({ setAddRepos }) => {

  const[term, setTerm] = useState('')

  const onChange = (e) => {
    setTerm(e.target.value);
  }

  const handleAddRepos = () => {
    if (term !== '') {
      setAddRepos(term);
    } else {
      alert('No username entered');
    }
  }

  return (
    <div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={term} onChange={onChange}/>
      <button onClick={handleAddRepos}> Add Repos </button>
    </div>
  );
}

export default Search;
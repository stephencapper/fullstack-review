import React, { useState } from 'react';

const Search = ({ setAddRepos }) => {

  const[term, setTerm] = useState('')

  const onChange = (e) => {
    setTerm(e.target.value);
  }

  const handleAddRepos = () => {
    console.log('adding repos first step');
    console.log('term: ', term);
    console.log('term is empty?: ', term !== '');
    if (term !== '') {
      console.log('adding repos second step');
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
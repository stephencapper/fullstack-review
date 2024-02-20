import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Axios from 'axios';
const axiosServer = Axios.create({
  baseURL: ''
});

const App = () => {

  const [repos, setRepos] = useState([]);
  const [addRepos, setAddRepos] = useState('');

  //POST username to server when addRepos changes
  useEffect(() => {
    console.log('adding repos', addRepos);
    if (addRepos === '') {
      return;
    }
    axiosServer.post('/repos', {
      username: addRepos
    })
    .then((response) => {
      console.log('Add repos successful: ', response.status, ' ', response.statusText)
    })
    .catch((error) => {
      alert('Unable to add repos, see console for details');
      if (error.response) {
        console.log('Error adding repos in server: ', error.response.status);
      } else if (error.request) {
        console.log('Error adding repos in server, request made no response: ', error.request);
      } else {
        console.log('Error creating request to add repos to server: ', error.message);
      }
    });
    return;
  }, [addRepos]);

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search setAddRepos={setAddRepos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
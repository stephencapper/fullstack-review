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
  const axiosGetTop25 = () => {
    axiosServer.get('/repos/top25')
      .then((response) => {
        console.log('Get repos successful: ', response.status, ' ', response.statusText);
        setRepos(response.data);
      })
      .catch((error) => {
        alert('Unable to fetch repos, see console for details');
        if (error.response) {
          console.log('Error getting repos from server: ', error.response.status);
        } else if (error.request) {
          console.log('Error getting repos from server, no response to request: ', error.request);
        } else {
          console.log('Error creating request to get repos from server: ', error.message);
        }
      });
  };
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
        console.log('Add repos successful: ', response.status, ' ', response.statusText);
      })
      .catch((error) => {
        alert('Unable to add repos, see console for details');
        if (error.response) {
          console.log('Error adding repos in server: ', error.response.status);
        } else if (error.request) {
          console.log('Error adding repos in server, no response to request: ', error.request);
        } else {
          console.log('Error creating request to add repos to server: ', error.message);
        }
      })
      .then(()=>{
        axiosGetTop25();
      });
    return;
  }, [addRepos]);

  useEffect(() => {
    axiosGetTop25();
    return;
  }, [setRepos]);

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search setAddRepos={setAddRepos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch, Routes } from 'react-router-dom';
import UserList from './UserList';
import UserDetail from './UserDetail';

function App() {
  const [users, setUsers] = useState([]);
  const [userPosts, setUserPosts] = useState({});

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setUserPosts(data);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const getUserPostsCount = (userId) => {
    return userPosts.filter(post => post.userId === userId).length;
  };

  console.log(getUserPostsCount);

  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<UserList users={users} post={userPosts} getUserPostsCount={getUserPostsCount} />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;

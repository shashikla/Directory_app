import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './directory.css';

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user:', error));


    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));

  }, [id]);



  console.log(posts);

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      gap:"10px",
      padding:"20px"
    }}>
      <Link to="/"><button className='btn-back'>Back</button></Link>
      <h2 style={{textAlign:"center"}}>Profile Page</h2>
      <div className='row'>
        <div >
        <p>{user?.name}</p>
        <p>{user?.username} | {user?.company.catchPhrase}</p>
        </div>
        <div >
        <p>Address: {user?.address.street},{user?.address.city}-{user?.address.zipcode}</p>
        <p>{user?.email} | {user?.phone}</p>
        </div>
      </div>
      <>
        <div className='post-content-list'>
        {posts.map(post => (
          <div key={post.id} className='post-content'>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            {/* Other post details */}
          </div>
        ))}
        </div>
      </>
      {/* <h2>{user.name}'s Profile</h2>
      <p>Email: {user.email}</p> */}
      {/* Display other user details */}
    </div>
  );
}

export default UserDetail;

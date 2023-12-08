// UserList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './directory.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



function UserCard({ user, getUserPostsCount }) {

    const postCount = getUserPostsCount(user.id);
    console.log(postCount);

    return (
        <div className='user-card'>
                    <Link to={`/users/${user.id}`} className='link'>
                        <p>
                            Name: {user.name}
                        </p>
                        <p>Total Posts: {postCount}</p>
                    </Link>
               
        </div>
    );
}



function UserList({ users, getUserPostsCount }) {
    return (
        <div className='directory-outer'>
            <div>
                <h3 style={{ textAlign: "center" }}>Directory</h3>
            </div>
           <div className='user-row'>
           {users.map(user => (
                <UserCard  key={user.id} user={user} getUserPostsCount={getUserPostsCount} />
            ))}
           </div>
        </div>
    );
}

export default UserList;

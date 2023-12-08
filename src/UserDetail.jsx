import React, { useState, useEffect, useRef  } from 'react';
import { useParams, Link } from 'react-router-dom';
import './directory.css';

function Clock({ timezone, isPaused  }) {
  const [currentTime, setCurrentTime] = useState('');

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const time = dateTime.toTimeString().split(' ')[0]; // Format time as HH:MM:SS
    return `${date} ${time}`;
  };
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`);
        const data = await response.json();
        const formattedDateTime = formatDateTime(data.datetime);
        setCurrentTime(formattedDateTime);
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        fetchTime();
      }
    }, 1000);

    fetchTime(); // Fetch time immediately when the component mounts

    return () => clearInterval(intervalRef.current);
  }, [timezone, isPaused]);

  return <div>{currentTime}</div>;
}

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [clockPaused, setClockPaused] = useState(false);

  useEffect(() => {
    // Fetch the list of countries and their timezones
    fetch('http://worldtimeapi.org/api/timezone')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setClockPaused(false);
  };

  const handlePauseResume = () => {
    setClockPaused(prevState => !prevState);
  };

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
      <div className='header'>
      <Link to="/"><button className='btn-back'>Back</button></Link>
      <div style={{
          display:"flex",
          gap:"10px"
        }}>
      <select value={selectedCountry} onChange={handleCountryChange} className='select-country'> 
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      {selectedCountry && (
        <div style={{
          display:"flex",
          gap:"10px"
        }}>
          <div className="clock_div">
          <Clock timezone={selectedCountry}  isPaused={clockPaused}/>
          </div>
          <button onClick={handlePauseResume} className='resume-btn'>{clockPaused ? 'Resume' : 'Pause'}</button>
        </div>
      )}
      </div>
      </div>
      <h2 style={{textAlign:"center"}}>Profile Page</h2>
      <div className='row'>
        <div className='content2'>
        <p>{user?.name}</p>
        <p>{user?.username} | {user?.company.catchPhrase}</p>
        </div>
        <div className='content2'>
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

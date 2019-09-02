import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from './JokesStyles';

const Jokes = ({ api }) => {
  const [jokes, setJokes] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('token')
    };
    setError(false);

    axios
      .get(`${api}/jokes`, {
        headers
      })
      .then(res => {
        setJokes(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
        setError(true);
      });
  }, [api]);

  return (
    <Container>
      {error ? (
        <h1>You haven't logged in yet.</h1>
      ) : (
        <h1>Here's some jokes.</h1>
      )}
      <ul>
        {jokes.map(({ id, joke }, i) => (
          <li key={id}>
            <span>{joke}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Jokes;

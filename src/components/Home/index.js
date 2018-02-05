'use strict'

import React from 'react';
import { Link } from 'react-router';

function Home( props ) {
  return [
    <h1>Welcome</h1>,
    <Link to="/login">Log in</Link>
  ]
}

export default Home;

import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'antd'

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to='./signup' ><Button>Signup</Button></Link>
      <Link to="./login" ><Button>Login</Button></Link>
    </div>
  );
}

export default Home;

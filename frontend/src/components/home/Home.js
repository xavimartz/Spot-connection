import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Card } from 'antd'

function Home() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh'
      }}>
      <Card title="SPOT-CONNECTION"
        style={{
          width: '50vw',
          height: '60vh',
          display: 'flex',
          flexDirection: 'column'
        }} >
        <Link to='./signup' ><Button>Signup</Button></Link>
        <Link to="./login" ><Button>Login</Button></Link>
      </Card>
    </div>
  );
}

export default Home;

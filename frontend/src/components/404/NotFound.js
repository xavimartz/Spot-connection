import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Link to='./dashboard'><Button type="primary">Back Home</Button></Link>}
    />
  );
}

export default NotFound;

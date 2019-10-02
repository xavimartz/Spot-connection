import React, { Component } from 'react'
import MY_SERVICE from '../../services'
import { Card, Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'

export default class Login extends Component {
  state = {
    user: {}
  }

  onSubmit = (e) => {
    e.preventDefault();
    MY_SERVICE.login(this.state.user)
      .then((response) => {
        this.context.logUser(response.data.user);
        console.lod(response.data.user)
        this.props.history.push('/profile');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onSubmit = (e) => {
    e.preventDefault();
    MY_SERVICE.login(this.state.user)
      .then((response) => {
        this.context.logUser(response.data.user);
        this.props.history.push('/profile');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
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
        <Card style={{ width: '50vw' }} title='Login'>
          <Form onSubmit={this.onSubmit}>

            <Form.Item label="Email">
              <Input name="email" type="email" onChange={this.handeleInput} />
            </Form.Item>

            <Form.Item label="Password">
              <Input name="password" type="password" onChange={this.handeleInput} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">Login</Button>
              <br />
              <Link to="./signup">
                Create an account
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
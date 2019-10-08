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
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.props.history.push(`/profile/${response.data.user._id}`);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleInput = (e) => {
    const { user } = this.state
    const key = e.target.name
    user[key] = e.target.value
    this.setState({ user })
  }

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
              <Input name="email" type="email" onChange={this.handleInput} />
            </Form.Item>

            <Form.Item label="Password">
              <Input.Password name="password" type="password" onChange={this.handleInput} />
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

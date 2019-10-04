import React, { Component } from 'react'
import MY_SERVICE from '../../services'
import { Card, Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'

export default class Signup extends Component {
  state = {
    user: {}
  }

  handleInput = (e) => {
    const { user } = this.state
    const key = e.target.name
    user[key] = e.target.value
    this.setState({ user })
  }

  onSubmit = (e) => {
    e.preventDefault()
    MY_SERVICE.signup(this.state.user)
      .then((response) => this.props.history.push('/login'))
      .catch((err) => console.log(err))
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
        <Card style={{ width: '50vw' }} title='Signup'>
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="User name">
              <Input name="name" type="text" onChange={this.handleInput} />
            </Form.Item>

            <Form.Item label="Email">
              <Input name="email" type="text" onChange={this.handleInput} />
            </Form.Item>

            <Form.Item label="Password">
              <Input name="password" type="password" onChange={this.handleInput} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">Signup</Button>
              <br />
              <Link to="./login">
                Have an account
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}

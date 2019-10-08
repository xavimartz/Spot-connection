import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Nav extends Component {
  state = {
    user: {}
  }
  componentDidMount() {
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user)
      this.setState({ user })
    }
  }

  showProfile = () => {
    this.props.history.push(`/profile/${this.state.user._id}`)
  }

  logOut = async () => {
    await axios.get('http://localhost:3000/api/logout')
    localStorage.removeItem('user')
    this.props.history.push('/login')
  }

  render() {
    return (
      <Menu selectedKeys={[this.current]} mode="horizontal">
        <Menu.Item key="home">
          <Link to="/dashboard">
            <Icon type="home" />
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="user" onClick={() => this.showProfile()}>
          <Icon type="user" />
          User
        </Menu.Item>
        <Menu.Item key="logout" onClick={() => this.logOut()}>
          <Icon type="logout" />
          Logout
        </Menu.Item>
      </Menu>
    )
  }
}

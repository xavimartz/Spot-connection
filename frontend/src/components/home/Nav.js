import React, { Component } from 'react'
import { Menu, Icon, Button } from 'antd'

export default class Nav extends Component {
  render() {
    return (
      <Menu selectedKeys={[this.current]} mode="horizontal">
        <Menu.Item key="home">
          <Icon type="home" />
          Home
        </Menu.Item>
        <Menu.Item key="user">
          <Icon type="user" />
          User
        </Menu.Item>
        <Menu.Item key="logout">
          <Button type="link" htmlType="submit" onClick={() => this.props.logOut()}>
            <Icon type="logout" />
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    )
  }
}

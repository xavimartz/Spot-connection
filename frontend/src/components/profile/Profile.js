import React, { Component } from 'react';
import { Button, Card, Avatar, Descriptions } from 'antd';
import Nav from '../home/Nav'
import EditProfile from '../Modal/EditProfile'
import ShowPlace from '../map/ShowPlace'
import { editUser } from '../../services/auth';
import Application from '../application/Application';
import Request from '../application/Request';

const { Meta } = Card

export default class Profile extends Component {
  state = {
    user: {},
    visible: false,
  }

  //HELPER PARA EL ESTADO DE LOGEO DEL USUARIO
  componentDidMount() {
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user)
      this.setState({ user })

    }
    if (!localStorage.user) {
      return this.props.history.push('/login')
    }
  }
  //===============================================


  //-----------METODOS PARA MOSTRAR MODAL

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  showEditProfile = () => {
    this.setState({
      visible: true,
    });
  };

  onCancel = e => {
    this.setState({
      visible: false
    })
  }
  //=============================================

  //---------Meotods para setear nuevos valores
  onSubmit = () => {
    let { user } = this.state
    editUser(user)
      .then(res => {
        console.log('paso', res)
        this.setState({ visible: false })
        const strUser = JSON.stringify(this.state.user)
        localStorage.setItem('user', strUser)
      })
      .catch((error) => {
        console.log('tengo errr:', error);
      })
  }

  handleInput = (e) => {
    const { user } = this.state
    const key = e.target.name
    user[key] = e.target.value
    this.setState({ user })
    console.log(user)
  }
  //==================================================

  render() {
    let { name, email, phone, image } = this.state.user
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh'
      }}>
        <Nav history={this.props.history} />
        <Card style={{ width: "70vw" }}>
          <Meta
            avatar={<Avatar size={130} src={image} />}
            title={name}
            description={
              <Descriptions>
                <Descriptions.Item>Email: {email}</Descriptions.Item>
                <Descriptions.Item>Telefono: {phone}</Descriptions.Item>
              </Descriptions>
            }
          />
          <Button type="primary" onClick={this.showEditProfile}>Edit Profile</Button>
          <EditProfile
            onCancel={this.onCancel}
            onSubmit={this.onSubmit}
            handleInput={this.handleInput}
            visible={this.state.visible}
            handleCancel={this.handleCancel}
          />
        </Card>
        <ShowPlace userID={this.props.match.params.id} />
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '70vw' }}>
          <Application width="50vw" userID={this.props.match.params.id} />
          <Request width="50vw" userID={this.props.match.params.id} />
        </div>
      </div>
    );
  }
}
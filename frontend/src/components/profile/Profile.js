import React, { Component } from 'react';
import { Button, Card, Avatar, Descriptions } from 'antd';
import Nav from '../home/Nav'
import EditProfile from '../Modal/EditProfile'
import ShowPlace from '../map/ShowPlace'
import axios from 'axios'
import { editUser } from '../../services/auth';

const { Meta } = Card

export default class Profile extends Component {
  state = {
    user: {},
    visible: false,
  }

  //HELPER PARA EL ESTADO DE LOGEO DEL USUARIO
  componentDidMount() {
    //if (!this.context.state.loggedUser) return this.props.history.push('/login')
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user)
      this.setState({ user })

    }
    if (!localStorage.user) {
      return this.props.history.push('/login')
    }
  }

  logOut = async () => {
    await axios.get('http://localhost:3000/api/logout')
    localStorage.removeItem('user')
    this.props.history.push('/login')
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
  //=============================================

  //---------Meotods para setear nuevos valores
  onSubmit = () => {
    let { user } = this.state
    console.log('entro', user)
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
        <Nav logOut={this.logOut}></Nav>
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
            onSubmit={this.onSubmit}
            handleInput={this.handleInput}
            visible={this.state.visible}
            handleCancel={this.handleCancel}
          />
        </Card>
        <ShowPlace userID={this.props.match.params.id} />
      </div>
    );
  }
}
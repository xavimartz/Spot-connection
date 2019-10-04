import React, { Component } from 'react';
import { Button, Card, Avatar, Descriptions } from 'antd';
import Nav from '../home/Nav'
import EditProfile from '../Modal/EditProfile'
import axios from 'axios'
import { editUser } from '../../services/auth';

const { Meta } = Card

export default class Profile extends Component {
  state = {
    user: JSON.parse(localStorage.getItem('user')),
    visible: false,
  }

  //HELEPER PARA EL ESTADO DE LOGEO DEL USUARIO
  componentDidMount() {
    !this.state.user && this.props.history.push('/login')
  }

  logOut = async () => {
    await axios.get('http://localhost:3000/api/logout')
    localStorage.removeItem('user')
    this.props.history.push('/login')
  }
  //===============================================


  //-----------METODOS PARA MOSTRAR MODAL
  handleOk = e => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  //=============================================

  //---------Meotods para setear nuevos valores
  onSubmit = () => {

    let { user } = this.state
    console.log('entro', user)
    editUser(user).then(res => {
      console.log('paso', res)
      this.setState({ visible: false })
    }).catch((error) => {
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
                <br />
                <br />
                <Descriptions.Item>Email: {email}</Descriptions.Item>
                <Descriptions.Item>Telefono:{phone}</Descriptions.Item>
              </Descriptions>
            }
          />
          <Button type="primary" onClick={this.showModal}>Edit Profile</Button>
          <EditProfile
            onSubmit={this.onSubmit}
            handleInput={this.handleInput}
            showModal={this.showModal} //revisar si funciona borrando esta linea
            visible={this.state.visible}
            handleOk={this.handleOk}
            handleCancel={this.handleCancel}
          />
        </Card>
      </div>
    );
  }
}
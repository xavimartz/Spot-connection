import React, { Component } from 'react'
import { Modal, Form } from 'antd';

class ModalEdit extends Component {
  state = {
    user: JSON.parse(localStorage.getItem('user'))
  }
  setUser = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

      if (err) {
        console.log('Received values of form: ', err);
      } else {

        this.props.onSubmit()
      }
    });
  }
  render() {
    const { name, email, phone } = this.state.user
    let { setUser } = this
    //const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title="Edit Profile"
          visible={this.props.visible}
          footer={null}
        >
          <Form onSubmit={setUser} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>

            <input name="name" onChange={this.props.handleInput} defaultValue={name}></input>

            <input name="email" onChange={this.props.handleInput} defaultValue={email}></input>

            <input type="number" min="0" name="phone" onChange={this.props.handleInput} defaultValue={phone}></input>

            <button type="submit" >SAVE</button>
          </Form>
        </Modal>
      </div>
    )
  }
}
const EditProfile = Form.create()(ModalEdit);
export default EditProfile;
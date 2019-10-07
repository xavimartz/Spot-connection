import React, { Component } from 'react'
import { Modal, Form, Button, Input } from 'antd';

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
    const { onCancel, visible, handleCancel, handleInput } = this.props
    let { setUser } = this
    //const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title="Edit Profile"
          visible={visible}
          footer={null}
          header={null}
          onCancel={onCancel}
        >
          <Form onReset={handleCancel} onSubmit={setUser} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Form.Item label="User name">
              <Input name="name" onChange={handleInput} defaultValue={name} />
            </Form.Item>
            <Form.Item label="Email">
              <Input name="email" onChange={handleInput} defaultValue={email} />
            </Form.Item>
            <Form.Item label="Phone number">
              <Input type="number" min="0" name="phone" onChange={handleInput} defaultValue={phone} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" >SAVE</Button>
              <Button htmlType="reset" >Cancel</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
const EditProfile = Form.create()(ModalEdit);
export default EditProfile;
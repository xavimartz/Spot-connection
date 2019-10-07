import React, { Component } from 'react'
import { Modal, Form, Input, DatePicker, Button } from 'antd'

const { RangePicker } = DatePicker

class ModalPlace extends Component {

  //Datpicker and timepicker methods


  handleDate = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return err
      //fromato de la fecha para antes de enviar
      const rangeValue = fieldsValue['range-picker']
      const values = {
        ...fieldsValue,
        'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
      }
      console.log('Valores recibidos del form: ', values);
      this.props.onSubmit()
    })
  }


  render() {
    const { visible, onCancel, handleCancel, handleInput, onChangeDate } = this.props
    const { getFieldDecorator } = this.props.form;
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    }
    return (
      <div>
        <Modal
          title="Set your place!"
          visible={visible}
          footer={null}
          header={null}
          onCancel={onCancel}>
          <Form onReset={handleCancel} onSubmit={this.handleDate}>
            <Form.Item label="Colonia">
              <Input name="suburb" onChange={handleInput} />
            </Form.Item>
            <Form.Item label="Delegacion">
              <Input name="delegation" onChange={handleInput} />
            </Form.Item>
            <Form.Item label="Estado">
              <Input name="country" onChange={handleInput} />
            </Form.Item>
            <Form.Item label="Descrpición">
              <Input name="description" onChange={handleInput} />
            </Form.Item>
            <Form.Item label="Servicios">
              <Input name="services" onChange={handleInput} />
            </Form.Item>
            <Form.Item label="Reglamento">
              <Input name="rules" onChange={handleInput} />
            </Form.Item>
            <Form.Item label="Fechas de ocupacion y desalojo">
              {getFieldDecorator('range-picker', rangeConfig)(<RangePicker onChange={onChangeDate} />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" >SAVE</Button>
              <Button htmlType="reset" >Cancel</Button>
            </Form.Item>
          </Form>
        </Modal >
      </div >
    )
  }
}

const FormPlace = Form.create()(ModalPlace);
export default FormPlace
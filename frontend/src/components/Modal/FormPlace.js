import React, { Component } from 'react'
import { Modal, Form, Input, DatePicker, Button } from 'antd'

const { RangePicker } = DatePicker

class ModalPlace extends Component {

  //Datpicker and timepicker methods


  handleSubmit = (e, action) => {
    const { onSubmit, form: { resetFields, validateFields } } = this.props
    e.preventDefault()

    return validateFields((err, fieldsValue) => {
      const rangeValue = fieldsValue['range-picker']
      const submitValues = {
        ...fieldsValue,
        ocupationDate: rangeValue[0].format('YYYY-MM-DD'),
        evictionDate: rangeValue[1].format('YYYY-MM-DD')
      }
      delete submitValues['range-picker']

      console.log(submitValues)
      if (action === 'add') onSubmit(submitValues, resetFields)
      else
        this.props.onEdit(submitValues)
    })
  }

  getInitialValue(fieldName) {
    const { stateValues } = this.props
    return stateValues[fieldName] ? stateValues[fieldName] : ''
  }

  render() {
    const { visible, onCancel, isEditing } = this.props
    const { getFieldDecorator } = this.props.form;
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: 'Selecciona una fecha!' }],
    }

    return (
      <div>
        <Modal
          title="Set your place!"
          visible={visible}
          footer={null}
          header={null}
          onCancel={onCancel}>
          <Form>
            <Form.Item label="Colonia">
              {getFieldDecorator('suburb', { initialValue: this.getInitialValue('suburb') })(<Input name="suburb" />)}
            </Form.Item>
            <Form.Item label="Delegacion">
              {getFieldDecorator('delegation', { initialValue: this.getInitialValue('delegation') })(<Input name="delegation" />)}
            </Form.Item>
            <Form.Item label="Estado">
              {getFieldDecorator('country', { initialValue: this.getInitialValue('country') })(<Input name="country" />)}
            </Form.Item>
            <Form.Item label="Descrpición">
              {getFieldDecorator('description', { initialValue: this.getInitialValue('description') })(<Input name="description" />)}
            </Form.Item>
            <Form.Item label="Servicios">
              {getFieldDecorator('services', { initialValue: this.getInitialValue('services') })(<Input name="services" />)}
            </Form.Item>
            <Form.Item label="Reglamento">
              {
                getFieldDecorator('rules', { initialValue: this.getInitialValue('rules') })(<Input name="rules" />)
              }
            </Form.Item>
            <Form.Item label="Fechas de ocupacion y desalojo">
              {getFieldDecorator('range-picker', rangeConfig)(<RangePicker />)}
            </Form.Item>
            <Form.Item>
              {!isEditing ?
                <Button type="primary" onClick={(e) => this.handleSubmit(e, 'add')} >SAVE</Button>
                :
                <Button type="primary" onClick={(e) => this.handleSubmit(e, 'edit')} >Edit</Button>
              }
              <Button onClick={onCancel} >Cancel</Button>
            </Form.Item>
          </Form>
        </Modal >
      </div >
    )
  }
}

const FormPlace = Form.create()(ModalPlace);
export default FormPlace
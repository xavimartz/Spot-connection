import React, { Component } from 'react'
import { changeStatus } from '../../services/applicationService'
import { Card, Button } from 'antd'

export default class CardApplicant extends Component {
  state = {
    applicant: this.props.applicant
  }
  render() {
    const { applicant } = this.state
    return (
      <div>
        <Card title={applicant.applicantName}>
          <p>Direccion: {applicant.address.suburb}, {applicant.address.delegation}, {applicant.address.country}</p>
          <p>Status: <b>{applicant.status}</b></p>
          <Button.Group>
            <Button size="small" icon="check" type="primary" onClick={() => {
              changeStatus(applicant._id, 'Acepted')
              this.setState((prevState) => {
                const { applicant } = prevState
                return { applicant: { ...applicant, status: 'Acepted' } }
              })
            }} />
            <Button size="small" icon="close" onClick={() => {
              changeStatus(applicant._id, 'Rejected')
              this.setState((prevState) => {
                const { applicant } = prevState
                return { applicant: { ...applicant, status: 'Rejected' } }
              })
            }} />
          </Button.Group>
        </Card>
      </div>
    )
  }
}

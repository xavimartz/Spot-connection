import React, { Component } from 'react'
import { showApplication, changeStatus } from '../../services/applicationService'
import { Card, Button } from 'antd'

export default class Application extends Component {
  state = {
    applicants: []
  }

  componentDidMount() {
    let { userID } = this.props
    showApplication(userID)
      .then(({ data }) => {
        if (data) this.setState({ applicants: [...data] });
      })
      .catch((err) => console.log('error en Application', err))
  }

  render() {
    const { applicants } = this.state
    console.log(applicants)
    return (
      <div>
        <Card>
          Mis solicitudes de intercambio
          {applicants.map((applicant) => (
            <Card title={applicant.applicantName} key={applicant._id}>
              <p>Direccion: {applicant.address.suburb}, {applicant.address.delegation}, {applicant.address.country}</p>
              <p>Status: <b>{applicant.status}</b></p>
              <Button.Group>
                <Button size="small" icon="check" type="primary" onClick={() =>
                  changeStatus(applicant._id, 'Acepted'
                  )} />
                <Button size="small" icon="close" onClick={() =>
                  changeStatus(applicant._id, 'Rejected')} />
              </Button.Group>
            </Card>
          ))
          }
        </Card>
      </div>
    )
  }
}

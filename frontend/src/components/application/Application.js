import React, { Component } from 'react'
import { showApplication } from '../../services/applicationService'
import { Card } from 'antd'
import CardApplicant from './CardApplicant'

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
            <CardApplicant key={applicant._id} applicant={applicant} />
          ))
          }
        </Card>
      </div>
    )
  }
}

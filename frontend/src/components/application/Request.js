import React, { Component } from 'react'
import { showRequest } from '../../services/applicationService'
import { Card } from 'antd'

export default class Request extends Component {
  state = {
    requests: []
  }

  componentDidMount() {
    let { userID } = this.props
    showRequest(userID)
      .then(({ data }) => {
        if (data) this.setState({ requests: [...data] });
      })
      .catch((err) => console.log('error en Request', err))
  }

  render() {
    const { requests } = this.state
    return (
      <div>
        <Card>
          Pendientes para intercambio
          {requests.map((request) => (
            <Card key={request._id}>
              <p>Direccion: {request.address.suburb}, {request.address.delegation}, {request.address.country}</p>
              <p>Status: <b>{request.status}</b></p>
            </Card>
          ))
          }
        </Card>
      </div>
    )
  }
}

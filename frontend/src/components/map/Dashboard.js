import React, { Component } from 'react'
import PLACE_SERVICE from '../../services/placeService'
import { createApplication } from '../../services/applicationService'
import Nav from '../home/Nav'
import { Card, Row, Col, Button } from 'antd'
import moment from 'moment'

export default class Dashboard extends Component {
  state = {
    user: {},
    places: []
  }

  componentDidMount() {
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user)
      this.setState({ user })
      PLACE_SERVICE.showAllPlace()
        .then(({ data }) => {
          if (data) this.setState({ places: [...data] });
        })
        .catch((err) => console.log('este es mi error', err))
    }
    if (!localStorage.user) {
      return this.props.history.push('/login')
    }
  }

  render() {
    const { places } = this.state
    return (
      <section
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100vw',
          height: '100vh'
        }}>
        <Nav history={this.props.history} />
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            width: '70vw',
            height: '100vh'
          }}>
          <Row gutter={32}>
            {places.map((place) => (
              <Col key={place._id} xs={24} md={12} lg={8}>
                <Card title={place.owner.name}>
                  <div>
                    <p>Direccion: {place.suburb}, {place.delegation}, {place.country}</p>
                    <p>Descripcion: {place.description}</p>
                    <p>Servicios: {place.services}</p>
                    <p>Servicios: {place.rules}</p>
                    {
                      place.ocupationDate && place.evictionDate ?
                        (<div>
                          <div><p>Fecha de alojo: <b >{moment(place.ocupationDate).format('L')}</b></p></div>
                          <div><p>Fecha de desalojo <b >{moment(place.evictionDate).format('L')}</b></p></div>
                        </div>
                        ) :
                        (<p></p>)
                    }
                    <Button onClick={() =>
                      createApplication(
                        {
                          address: { suburb: place.suburb, delegation: place.delegation, country: place.country },
                          ownId: JSON.parse(localStorage.getItem('user'))._id,
                          applicantId: place.owner._id,
                          ownerName: place.owner.name,
                          applicantName: this.state.user.name
                        }
                      )
                    }> Apply </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    )
  }
}

import React, { Component } from 'react'
import PLACE_SERVICE from '../../services/placeService'
import Nav from '../home/Nav'
import { Card, Row, Col } from 'antd'
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
                    <p>{place.suburb}</p>
                    <p>{place.delegation}</p>
                    <p>{place.country}</p>
                    <p>{place.description}</p>
                    <p>{place.services}</p>
                    <p>{place.rules}</p>
                    {
                      place.ocupationDate && place.evictionDate ?
                        (<p><b >{moment(place.ocupationDate).format('L')}</b> - <b >{moment(place.evictionDate).format('L')}</b></p>) :
                        (<p></p>)
                    }
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

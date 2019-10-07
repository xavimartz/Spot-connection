import React, { Component } from 'react'
import FormPlace from '../Modal/FormPlace'
import { Button, Card } from 'antd';
import PLACE_SERVICE from '../../services/placeService'

export default class ShowPlace extends Component {
  state = {
    place: {}
  }

  componentDidMount() {
    const { place } = this.state
    PLACE_SERVICE.showPlace(place)
      .then((res) => {
        console.log('esta es mi respuesta', res)
        this.setState(res)
      })
      .catch((err) => console.log('este es mi error', err))
  }

  showModalPlace = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onSubmit = () => {
    let { place } = this.state
    place['id'] = this.props.userID
    console.log('entro el onSubmit', place)
    PLACE_SERVICE.addPlace(place)
      .then(res => {
        console.log('paso agregar un lugar', res)
        this.setState({ visible: false })
      })
      .catch((error) => {
        console.log('tengo errr:', error);
      })
  }

  handleInput = (e) => {
    const { place } = this.state
    const key = e.target.name
    place[key] = e.target.value
    this.setState({ place })
    console.log(place)
  }
  onChangeDate = (date, dateString) => {
    const { place } = this.state
    place['ocupationDate'] = dateString[0]
    place['evictionDate'] = dateString[1]
    this.setState({ place })
    console.log(dateString);
  }

  render() {
    let { suburb, delegation, country, address, description, services, rules, ocupationDate, evictionDate, location } = this.state.place

    return (
      <div>
        <Card style={{ width: "70vw" }}>
          <Button style={{ float: "right" }} type="primary" onClick={this.showModalPlace}>Add place</Button>
          <p>{suburb} {delegation} {country} {address}</p>
          <p>{description}</p>
          <p>{services}</p>
          <p>{rules}</p>
          <p>{ocupationDate}</p>
          <p>{evictionDate}</p>
          <p>{location}</p>
        </Card>
        <FormPlace
          onSubmit={this.onSubmit}
          handleInput={this.handleInput}
          visible={this.state.visible}
          handleCancel={this.handleCancel}
          onChangeDate={this.onChangeDate} />
      </div>
    )
  }
}

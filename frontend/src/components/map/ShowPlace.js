import React, { Component } from 'react'
import FormPlace from '../Modal/FormPlace'
import { Button, Card } from 'antd';
import PLACE_SERVICE from '../../services/placeService'
import moment from 'moment';

export default class ShowPlace extends Component {
  state = {
    place: {}
  }

  componentDidMount() {
    const { userID } = this.props
    PLACE_SERVICE.showPlace(userID)
      .then((res) => {
        if (res.data.place) {
          this.setState({ place: res.data.place })
        }
      })
      .catch((err) => console.log('este es mi error', err))
  }

  deletePlace = () => {
    const { _id } = this.state.place
    PLACE_SERVICE.deletePlaceService(_id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
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

  onCancel = e => {
    this.setState({
      visible: false
    })
  }

  onSubmit = () => {
    let { place } = this.state
    place['id'] = this.props.userID
    PLACE_SERVICE.addPlace(place)
      .then(res => {
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
    let { suburb, delegation, country, description, services, rules, ocupationDate, evictionDate, _id } = this.state.place
    console.log(this.state);
    return (
      <div>
        <Card style={{ width: "70vw" }}>
          {_id ?
            <div>
              <Button style={{ float: "right" }} type="primary" onClick={this.showModalPlace}>Edit Place</Button>
              <Button style={{ float: "right" }} onClick={this.deletePlace}>Delete</Button>
            </div> :
            <Button style={{ float: "right" }} type="primary" onClick={this.showModalPlace}>Add place</Button>
          }
          <br />
          <br />
          <div>
            <p>{suburb} {delegation} {country}</p>
            <p>{description}</p>
            <p>{services}</p>
            <p>{rules}</p>
            {
              ocupationDate && evictionDate ?
                (<p>{moment(ocupationDate).format('L')} - {moment(evictionDate).format('L')}</p>) :
                (<p></p>)
            }
          </div>
        </Card>
        <FormPlace
          onCancel={this.onCancel}
          onSubmit={this.onSubmit}
          handleInput={this.handleInput}
          visible={this.state.visible}
          handleCancel={this.handleCancel}
          onChangeDate={this.onChangeDate} />
      </div>
    )
  }
}

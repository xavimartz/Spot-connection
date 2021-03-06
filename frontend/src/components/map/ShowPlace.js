import React, { Component } from 'react'
import FormPlace from '../Modal/FormPlace'
import { Button, Card } from 'antd';
import PLACE_SERVICE from '../../services/placeService'
import moment from 'moment';

export default class ShowPlace extends Component {
  state = {
    place: {},
    isEditing: false,
  }

  componentDidMount() {
    const { userID } = this.props
    console.log('estado previo', this.state.place)
    PLACE_SERVICE.showPlace(userID)
      .then((res) => {
        if (res.data.place) {
          console.log(typeof res.data.place)
          this.setState({ place: res.data.place })
          console.log('estado nuevo??', this.state.place)
        }
      })
      .catch((err) => console.log('este es mi error', err))
  }


  showModalPlace = (action) => {
    this.setState({
      isEditing: action === 'edit',
      visible: true,
    });
  };

  onCancel = e => {
    this.setState({
      visible: false
    })
  }

  onSubmit = (values, resetFields) => {
    values['id'] = this.props.userID
    PLACE_SERVICE.addPlace(values)
      .then(res => {
        this.setState({
          visible: false,
          place: res.data.place
        })
        return resetFields();
      })
      .catch((error) => {
        console.log('tengo errr:', error);
      })
  }

  onEdit = (formValues) => {
    formValues['_id'] = this.state.place._id
    PLACE_SERVICE.editePlace(formValues)
      .then(res => {
        console.log('ON_EDIT_RESPONSE', res)
        this.setState({
          visible: false,
          place: res.data.place
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  deletePlace = () => {
    const { _id } = this.state.place
    PLACE_SERVICE.deletePlaceService(_id)
      .then((res) => {
        this.setState({
          place: {}
        })
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  render() {
    let { suburb, delegation, country, description, services, rules, ocupationDate, evictionDate } = this.state.place
    return (
      <div>
        <Card>
          {suburb ?
            <div>
              <Button style={{ float: "right" }} type="primary" onClick={() => this.showModalPlace('edit')}>Edit Place</Button>
              <Button style={{ float: "right" }} onClick={this.deletePlace}>Delete</Button>
            </div> :
            <div>
              <Button style={{ float: "right" }} type="primary" onClick={() => this.showModalPlace('add')}>Add place</Button>
              <h1>Agrega la ubicacion de tu departamento</h1>
            </div>
          }
          <br />
          <br />
          {
            ocupationDate && evictionDate ?
              (<div>
                <p>Dirección: {suburb}, {delegation}, {country}</p>
                <p>Descripción: {description}</p>
                <p>Serviciós: {services}</p>
                <p>Reglamento: {rules}</p>
                <p>Fecha de alojo: {moment(ocupationDate).format('L')} || Fecha de desalojo: {moment(evictionDate).format('L')}</p>
              </div>) :
              (<p></p>)
          }
        </Card>
        <FormPlace
          visible={this.state.visible}
          isEditing={this.state.isEditing}
          stateValues={this.state.place}
          onCancel={this.onCancel}
          onSubmit={this.onSubmit}
          onEdit={this.onEdit}
        />
      </div>
    )
  }
}

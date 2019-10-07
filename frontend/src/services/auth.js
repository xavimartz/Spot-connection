import { base_url } from './base_url'
import axios from 'axios'

export const editUser = (data) => {

  return axios.put(`${base_url}/profile/${data._id}`, data)
    .then(response => response.data)
    .catch((err) => {
      throw err
    })
}

export const showProfile = (id) => {

  return axios.get(`${base_url}/profile/${id}`)
    .then((response) => response.data)
    .catch((err) => {
      throw err
    })
}

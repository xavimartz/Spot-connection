import { app_url } from './base_url'
import axios from 'axios'

export const showApplication = (id) => {
  console.log(id)
  return axios.get(`${app_url}/application/${id}`)
    .then((response) => response)
    .catch((err) => {
      throw err
    })
}

export const showRequest = (id) => {
  return axios.get(`${app_url}/request/${id}`)
    .then((response) => response)
    .catch((err) => {
      throw err
    })
}

export const createApplication = (data) => {
  return axios.post(`${app_url}/application/`, data)
    .then(response => response.data)
    .catch((err) => {
      throw err
    })
}

export const changeStatus = (id, status) => {
  return axios.put(`${app_url}/application/${id}`, { status })
    .then(response => response.data)
    .catch((err) => {
      throw err
    })
}

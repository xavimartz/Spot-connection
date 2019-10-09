import { app_url } from './base_url'
import axios from 'axios'

export const showApplicantions = (id) => {
  return axios.get(`${app_url}/applications/${id}`)
    .then((response) => response.data)
    .catch((err) => {
      throw err
    })
}

export const showRequest = (id) => {
  return axios.get(`${app_url}/requests/${id}`)
    .then((response) => response.data)
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

export const acceptApplication = (data) => {
  return axios.put(`${app_url}/application/${data._id}`, data)
    .then(response => response.data)
    .catch((err) => {
      throw err
    })
}

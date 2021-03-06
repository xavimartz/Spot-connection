import { map_url } from './base_url'
import axios from 'axios'

const SERVICE = axios.create({ withCredentials: true, map_url });

const PLACE_SERVICE = {
  showAllPlace: async () => {
    return await SERVICE.get(`${map_url}/dashboard`)
  },

  showPlace: async (id) => {
    return await SERVICE.get(`${map_url}/place/${id}`)
  },

  addPlace: async (place) => {
    return await SERVICE.post(`${map_url}/place/new`, place)
  },

  editePlace: async (data) => {
    console.log('paso el servicio edit??', data, data._id);
    return await SERVICE.put(`${map_url}/place/edit/${data._id}`, data)
  },

  deletePlaceService: async (id) => {
    return await SERVICE.delete(`${map_url}/place/delete/${id}`)
  }
}

export default PLACE_SERVICE
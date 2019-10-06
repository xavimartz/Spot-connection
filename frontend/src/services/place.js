import { map_url } from './base_url'
import axios from 'axios'

const SERVICE = axios.create({ withCredentials: true, map_url });

const PLACE_SERVICE = {
  showPlace: async (place) => {
    return await SERVICE.get(`${map_url}/place/${place}._id`, place)
  },

  addPlace: async (place) => {
    return await SERVICE.post(`${map_url}/place/new`, place)
  }
}

export default PLACE_SERVICE
import axios from 'axios'

export const addUserInDb = async (userData) => {
      const resp = await axios.post('/users/register', userData);
      return resp.data
  };
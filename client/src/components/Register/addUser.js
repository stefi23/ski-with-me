import axios from 'axios'

export const addUserInDb = async (userData) => {
    try {
      const resp = await axios.post('/users/register', userData);
      return resp.data
    }
    catch (err) {
      console.log("err", err)
    }
  };
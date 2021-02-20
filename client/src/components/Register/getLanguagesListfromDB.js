import axios from "axios";

export const getLanguagesListfromDB = async () => {
    try {
      const resp = await axios.get('/AllLanguages');
      let languagesArr = resp.data.map(languages => {
        return languages.language
      })
      languagesArr = languagesArr.sort()
      return languagesArr
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

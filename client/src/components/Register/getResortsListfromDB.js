import axios from "axios";

export const getResortsListfromDB = async () => {
  try {
    const resp = await axios.get('/AllResorts');
    let resortsArr = resp.data.map(resorts => {
      return resorts.resort_name
    })
    resortsArr = resortsArr.sort()  

    return resortsArr;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

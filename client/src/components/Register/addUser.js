import axios from 'axios'

export const addUserInDb = async (userData) => {
    try {
      const resp = await axios.post('/users/register', userData);
      return resp.data
    //   if(resp.data.message === "user is already registered"){
    //     setShowAlert(true)
    //     return
    //   }
    //   localStorage.setItem("skiBuddyToken", resp.data.token);
    //   updateLoggedIn(true);
    //   getName(resp.data.name);
    //   getUserId(resp.data.id)
    //   history.push("/");
    }
    catch (err) {
      console.log(err)
    }
  };
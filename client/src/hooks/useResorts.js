import axios from "axios";
import React from 'react'

export const ResortsContext = React.createContext('resort')

export const ResortsProvider = ({ children }) => {
  const [resorts, setResorts] = React.useState([])
  const fetchResorts = async () => {
    const response = await axios.get('/AllResorts');
    setResorts(response.data.resorts);
  }

  React.useEffect(() => {
    fetchResorts();
  }, []);

  return (
    <ResortsContext.Provider value={{ resorts, fetchResorts }}>
      {children}
    </ResortsContext.Provider>
  );
}

export const useResorts = () => {
  return React.useContext(ResortsContext)
}
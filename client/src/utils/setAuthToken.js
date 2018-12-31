import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //Delete aut header
    delete axios.defaults.headers.common["Authorixation"];
  }
};

export default setAuthToken;

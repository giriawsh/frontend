import axios from 'axios'

const myaxios = axios.create({
  // ...
  baseURL: 'http://localhost:3000/api/'
});
myaxios.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    // ...
    console.log(error);
    return undefined;
  }
);
export default myaxios;

import axios from 'axios'

const myaxios = axios.create({
  // ...
  baseURL: 'http://localhost:8081'
});
myaxios.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    // ...
  }
);
export default myaxios;

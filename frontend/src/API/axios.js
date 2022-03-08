import axios from "axios"
axios.defaults.withCredentials = true;
const axiosConfig = {
    baseURL: 'http://localhost:5500/api/v1',
}
const callApi = axios.create(axiosConfig);

export default callApi;
import axios from "axios"

const axiosConfig = {
    baseURL: 'http://localhost:5500/api/v1',
    headers: {
        'Content-Type': 'application/json'
        }
}
const callApi = axios.create(axiosConfig);

export default callApi;
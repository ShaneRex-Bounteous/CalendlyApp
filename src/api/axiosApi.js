import axios from "axios"

const axiosApi = axios.create({
    baseURL: process.env.REACT_APP_api_base_url,
    headers: {
        Authorization: 'Bearer '+process.env.REACT_APP_access_token
    }
})

export default axiosApi
import axios from 'axios'

const AxiosHandler = axios.create({
    baseURL: "http://localhost:8090/"
    // baseURL: "http://10.0.0.166:8090/"
})

export default AxiosHandler;
import axios from 'axios'

const AxiosHandler = axios.create({
    baseURL: "http://localhost:8090/"
})

export default AxiosHandler;
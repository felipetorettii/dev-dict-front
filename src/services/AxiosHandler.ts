import axios from 'axios'

const AxiosHandler = axios.create({
    baseURL: "http://192.168.0.115:8090/"
})

export default AxiosHandler;
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-builder-f92a8.firebaseio.com/'
})

export default instance

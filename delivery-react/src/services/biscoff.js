import axios from 'axios'
import qs from 'qs'

const baseUrl = 'http://localhost:5000/api/v1'

// https://github.com/axios/axios#creating-an-instance
const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000, // 5000ms = 5s
})

const biscoffAPI = {
    login: (email, password) => {
        return axiosInstance.post('/users/login', qs.stringify({
            email: email,
            password: password,
        }))
    },
    getProducts: () => {
        return axiosInstance.get('/products')
    },
    getProductBySlug: (slug) => {
        return axiosInstance.get(`/products/${slug}`)
    },
    sendContactForm: (name, email, message) => {
        return axiosInstance.post('/send-contact-form', qs.stringify({
            name: name,
            email: email,
            message: message
        }))
    }
}

export default biscoffAPI
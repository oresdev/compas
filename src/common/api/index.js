import axios from 'axios'
/**
 * Manage your api.
 *
 * Current implementation Api should always be accessed through this instace.
 *
 * Perform a custom Axios request.
 *
 * data is an object containing the following properties:
 *  - method
 *  - url
 *  - data ... request payload
 *  - auth (optional)
 *    - username
 *    - password
 **/

// set a basic Api address from the local environment
axios.defaults.baseURL = process.env.VUE_APP_API

export default {
    init() {
        const headers = axios.defaults.headers.common

        headers['Content-Type'] = 'application/json; charset=utf-8'

        headers['Authorization'] = process.env.VUE_APP_API_KEY
    },

    close: () => (axios.defaults.headers.common = {}),

    get: (endpoint) => axios.get(endpoint),

    post: (endpoint, data) => axios.post(endpoint, data),

    patch: (endpoint, data) => axios.patch(endpoint, data),

    delete: (endpoint, data) => axios.delete(endpoint, data)
}

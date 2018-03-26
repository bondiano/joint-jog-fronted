
import axios from 'axios';
import { gcf } from '../config';

let instance = null;
const auth = () => `bearer ${window.localStorage.getItem('token')}`;

export default class XHRProvider {
    constructor() {
        if (instance !== null) {
            return instance;
        }
        instance = axios.create({
            baseURL: gcf.url,
            transformRequest: [(data, headers) => {
                headers['Authorization'] = auth();
                return JSON.stringify(data);
            }],
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${window.localStorage.getItem('token')}`
            }
        });
    }

    successHandler = (response) => {
        if(!response.data.success) {
            return new Promise((resolve, reject) => reject({response}));
        }
        return ({
            data: response.data.payload,
            success: response.data.success
        });
    }

    errorHandler = ({response}) => ({
            data: response.data,
            status: response.status
    });

    get = (path) =>
        instance
            .get(path)
            .then(this.successHandler)
            .catch(this.errorHandler);

    post = (path, body) =>
        instance
            .post(path, body)
            .then(this.successHandler)
            .catch(this.errorHandler);

    patch = (path, body) =>
        instance
            .patch(path, body)
            .then(this.successHandler)
            .catch(this.errorHandler);
}


import axios from 'axios';
import { gcf } from '../config';

let instance = null;
const headerWithToken = {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}};

export default class XHRProvider {
    constructor() {
        if (instance !== null) {
            return instance;
        }
        instance = axios.create({
            baseURL: gcf.url,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    successHandler = (response) => {
        if(!response.data.success) {
            return new Promise((resolve, reject) => reject({response}))
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

    get = (path, needToken = false) =>
        instance
            .get(path, needToken && headerWithToken)
            .then(this.successHandler)
            .catch(this.errorHandler);

    post = (path, body, needToken = false) =>
        instance
            .post(path, body, needToken && headerWithToken)
            .then(this.successHandler)
            .catch(this.errorHandler);

    patch = (path, body, needToken = false) =>
        instance
            .patch(path, body, needToken && headerWithToken)
            .then(this.successHandler)
            .catch(this.errorHandler);
}


import axios from 'axios';
import { gcf } from '../config';

let instance = null;

export default class XHRProvider {
    constructor() {
        if (instance !== null) {
            return instance;
        }
    }

    get = (path) =>
        axios
            .get(`${gcf.url}${path}`,
                {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}
            )
            .then(response => {
                if(!response.data.success) {
                    return new Promise((resolve, reject) => reject({response}))
                }
                return response.data.payload;
            })
            .catch(({response}) => {
                return ({
                    data: response.data,
                    status: response.status
                });
            });

    post = (path, body) =>
        axios
            .post(`${gcf.url}${path}`,
                body,
                {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}
            )
            .then(response => {
                if(!response.data.success) {
                    return new Promise((resolve, reject) => reject({response}))
                }
                return response.data.payload;
            })
            .catch(({response}) => {
                return ({
                    data: response.data,
                    status: response.status
                });
            });

    patch = (path, body) =>
        axios
            .patch(`${gcf.url}${path}`,
                body,
                {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}
            )
            .then(response => {
                if(!response.data.success) {
                    return new Promise((resolve, reject) => reject({response}))
                }
                return response.data.payload;
            })
            .catch(({response}) => {
                return ({
                    data: response.data,
                    status: response.status
                });
            });
}

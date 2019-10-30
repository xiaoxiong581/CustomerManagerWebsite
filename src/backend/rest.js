
import axios from 'axios'

if (process.env.NODE_ENV == 'development') {
	axios.defaults.baseURL = 'http://192.168.137.1:19080/customermanager/v1';
}else{
	axios.defaults.baseURL = 'http://192.168.137.1:19080/customermanager/v1';
}
axios.defaults.timeout = 10000

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err)
        })
    });
}

export function post(url, body) {
    return new Promise((resolve, reject) => {
        axios.post(url, body)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err)
            })
    });
}


import axios from 'axios';
import batchInterceptor from "./interceptor.js";

const client = () => {
    const config = {
        baseURL:"https://europe-west1-quickstart-1573558070219.cloudfunctions.net",
        responseType: 'json',
        headers: {},
    };

    const instance = axios.create(config);
    batchInterceptor(instance);
    return instance;
};

export default client();
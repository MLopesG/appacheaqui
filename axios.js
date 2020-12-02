  
import axios from 'axios';

const instance = axios.create({
    baseURL:'http://acheiaquiali.com.br/api'
});

export default instance;

  
import axios from 'axios';

const instance = axios.create({
    baseURL:'https://www.acheiaquiali.com.br/api/v2'
});

export default instance;

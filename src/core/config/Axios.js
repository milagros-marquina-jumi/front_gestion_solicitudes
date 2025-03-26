import axios from 'axios';

 const clienteAxios = axios.create({
    baseURL : 'http://localhost:9090/api/'
 });

 export default clienteAxios;
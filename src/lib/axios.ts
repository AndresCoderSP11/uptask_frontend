/* Esta parte vamos a colocar la BASEURL, para hacer funcionamiento de la API */
import axios from 'axios';

const api=axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
/* Generacion de interceptors para evitar la sobreescritura de los Authorization de codigo
en parte de ello */

api.interceptors.request.use(config=>{
    /* Si existe este token aplicaremos la siguiente configuracion de headers aturhoization para 
    aplicar el token alli, pero en el caso de los login nno ocurre esto asi que normal no habra ningun
    problema */
    const token=localStorage.getItem('AUTH_TOKEN');
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
})


export default api

import axios from "axios";


export default axios.create({
    baseURL:`${process.env.NODE_ENV === 'development' ?   process.env.REACT_APP_DEV_MODE_URL :   process.env.REACT_APP_PRO_MODE_URL}`,

    // baseURL:"http://localhost:8000/api",
    // baseURL:"http://greatpharma.org/pos_server/public/api",
    
    headers:{
        "Content-type" : "application/json",
        "Authorization" : `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
    }
});


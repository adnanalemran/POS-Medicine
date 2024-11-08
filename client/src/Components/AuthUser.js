import axios from "axios";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';

export default function AuthUser(){

    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }
    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        const user_details = JSON.parse(userString);
        return user_details;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());


    const saveToken = (user,token)=> {
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        setUser(user);
        // navigate('/dashboard');
        window.location.reload(true)

    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/');
    }

    const http = axios.create({
        baseURL:`${process.env.NODE_ENV === 'development' ?   process.env.REACT_APP_DEV_MODE_URL :   process.env.REACT_APP_PRO_MODE_URL}`,

        // baseURL:"http://greatpharma.org/pos_server/public/api",

        headers:{
            "Content-type" : "application/json",
            "Authorization" :  `Bearer ${token}`
        }
    })
    
    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        http,
        logout
    }
}
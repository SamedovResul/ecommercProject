import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'

import axios from 'axios'

export const GlobalState = createContext()




export const DataProvider = ({children}) =>{
    const [token, setToken] = useState("")


    const API = axios.create({ baseURL: 'http://localhost:5000' });
    
    API.interceptors.request.use((req) => {
        if (localStorage.getItem('firstLogin')) {
        req.headers.cookies = JSON.parse(localStorage.getItem('firstLogin')).accesstoken ;
        }
        return req;
    });

    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                
                
                const res = await API.get('/user/refresh_token')
                setToken(res.data.accesstoken)


                try {
                const res = await API.get('/user/refresh_token')
                // console.log(res)
                } catch (error) {
                    console.log(error.message)
                }
            }
            refreshToken()
        }
    },[token])


    
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token,API),
        categoriesAPI: CategoriesAPI(),
        Api:API
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
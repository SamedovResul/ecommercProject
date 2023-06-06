import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('firstLogin')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('firstLogin')).accesstoken}`;
    
  }
    return req;
  
});


const Api = {

  addToCart: (cart) =>{
    return axios.patch('http://localhost:5000/user/addcart', {cart})
  },

}


export default Api
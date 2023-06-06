import axios from "axios";
const API = axios.create({ baseURL: 'http://localhost:5000' });
API.interceptors.request.use((req) => {
  if (localStorage.getItem('firstLogin')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('firstLogin')).accesstoken}`;
    
  }
    return req;
  
});


const userApi = {


  registerUser:(user) =>{
    return API.post('/user/register',{...user})
  },

  loginUser:(user) =>{
    return API.post('/user/login', {...user})
  },
  
  logOut:() =>{
    return API.get('/user/logout',)
  },

  getUser:() =>{
    return API.get('/user/info',)
  },

  addCart:(data) =>{
    return API.patch('/user/addcart', data)
  }

}

export default userApi
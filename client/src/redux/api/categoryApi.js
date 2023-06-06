import axios from "axios";
const API = axios.create({ baseURL: 'http://localhost:5000' });
API.interceptors.request.use((req) => {
  if (localStorage.getItem('firstLogin')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('firstLogin')).accesstoken}`;
    
  }
    return req;
  
});

const Api = {
  GetCategories:()=>{
    return axios.get('http://localhost:5000/api/category')
  },

  CreateCategory:(data)=>{
    return API.post('/api/category',data)
  },

  EditCategories:(id,data)=>{
    return API.put(`/api/category/${id}`,data)
  },


  DeleteCategories:(id)=>{
    return API.delete(`/api/category/${id}`)
  }
}

export default Api
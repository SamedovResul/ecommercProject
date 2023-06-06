import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('firstLogin')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('firstLogin')).accesstoken}`;
    
  }
    return req;
  
});


// get products 

 const Api = {
  // get products 


  getProducts: (category, sort, search, page) =>{
    return axios.get(`http://localhost:5000/api/products?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
  },

  uploadImg: (data) =>{
    return API.post('api/upload', data, {
      headers: {'content-type': 'multipart/form-data'}
    })
  },

  creatingProduct:(data)=>{
    return API.post('api/products',data )
  },

  handleDestroy:(data)=>{
    return API.post('api/destroy',data)
  },

  updateProduct:(data,id) =>{
    return API.put(`api/products/${id}`, data)
  },

  deleteProduct:(data) =>{
    return API.delete(`api/products/${data.id}`)
  }
}


export default Api

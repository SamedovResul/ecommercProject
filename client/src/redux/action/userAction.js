import userApi from "../api/userApi";

export const registerUser = (user) => async (dispatch) =>{

  try {
    const {data} = await userApi.registerUser(user)
    dispatch({type:"LOGIN_REGISTER", payload:data})
    window.location.href = "/";
  } catch (error) {
    console.log(error.response)
  }
}

export const loginUser = (user) => async (dispatch) =>{
  try {
    const {data} = await userApi.loginUser(user)
    dispatch({type:"LOGIN_REGISTER", payload:data})
    window.location.href = "/";
  } catch (error) {
    console.log(error.response)
  }
}

export const logOut = (user) => async (dispatch) =>{
  try {
    const {data} = await userApi.logOut()
    dispatch({type:"LOG_OUT"})
    window.location.href = "/";
  } catch (error) {
    console.log(error.response)
  }
}

export const getUser = () => async (dispatch) =>{
  try {
    const {data} = await userApi.getUser()
    
    dispatch({type:"GET_USER", payload:data})
  } catch (error) {
    console.log(error.response)
  }
}

export const addToCart = (cart) => async (dispatch) =>{
  console.log(cart)
  try {
    const {data} = await userApi.addCart(cart)
    console.log(data)
    dispatch({type:"ADD_TO_CART", payload:data})
  } catch (error) {
    console.log(error.response)
  }
}
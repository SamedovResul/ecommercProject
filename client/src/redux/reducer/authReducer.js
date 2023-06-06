const Auth = (state = {authData: null,data:null,cart:""}, action) =>{
  switch (action.type) {
    case 'LOGIN_REGISTER':
      console.log(action.payload)
      localStorage.setItem("firstLogin", JSON.stringify({...action.payload}))
      return {...state, authData: action.payload}
    case 'LOG_OUT':
      localStorage.clear();
      return {...state, authData: null}
    case "GET_USER":
      return { ...state,  data: action.payload}
    case "ADD_TO_CART":
      return {...state ,cart:action.payload }
    default:
      return state;
  }
}

export default Auth
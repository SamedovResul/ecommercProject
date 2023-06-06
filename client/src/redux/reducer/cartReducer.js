const reducer = (state = [], action) =>{
  switch (action.type) {
    case 'ADDTOCART':
      return action.payload
    default:
      return state;
  }
}

export default reducer
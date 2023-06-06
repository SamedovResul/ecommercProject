

const reducer = (state = [], action) =>{
  switch (action.type) {
    case 'Get_Categories':
      return action.payload
    case 'Create_Categories':
      return [...state, action.payload]
    case 'Edit_Categories':
      return action.payload
    case 'Delete_Categories':
      return action.payload
    default:
      return state;
  }
}

export default reducer
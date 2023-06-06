import Api from "../api/categoryApi";


export const GetCategories = () => async (dispatch) =>{

  try {
    const { data } = await Api.GetCategories();
    dispatch({type:"Get_Categories", payload:data})
  } catch (error) {
    console.log(error.response)
  }
}

export const CreateCategory = (categoryData) => async (dispatch) =>{

  try {
    const { data } = await Api.CreateCategory(categoryData);
    dispatch({type:"Create_Categories", payload:data})
  } catch (error) {
    console.log(error.response)
  }
}

export const EditCategories = (id,categoryData) => async (dispatch) =>{

  try {
    const { data } = await Api.EditCategories(id,categoryData);
    dispatch({type:"Edit_Categories", payload:data})
  } catch (error) {
    console.log(error.response)
  }
}

export const DeleteCategories = (id) => async (dispatch) =>{

  try {
    const { data } = await Api.DeleteCategories(id);
    dispatch({type:"Delete_Categories", payload:data})
  } catch (error) {
    console.log(error.response)
  }
}
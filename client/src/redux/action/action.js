import Api from '../api/Api'


export const getAllProducts = (category, sort, search, page) => async (dispatch) =>{

  try {
    
    const { data } = await Api.getProducts(category, sort, search, page);
    dispatch({type:"GETPRODUCTS", payload:data})
  } catch (error) {
    console.log(error.response)
  }
}

export const uploadImg = (imgData) => async (dispatch) =>{

  try {
    const { data } = await Api.uploadImg(imgData);
    dispatch({type:"UPLOAD_IMG", payload:data})
  } catch (error) {
    console.log(error.response)
  }
}

export const creatingProduct = (productData) => async (dispatch) =>{

  try {
    const { data } = await Api.creatingProduct(productData);
    
    dispatch({type:"CREATE_PRODUCT", payload:data})
  } catch (error) {
    console.log(error.response)
  }
}

export const updateProduct = (productData,id) => async (dispatch) =>{

  try {
    const { data } = await Api.updateProduct(productData,id);
    dispatch({type:"UPDATE_PRODUCT", payload:data})
  } catch (error) {
    console.log(error.response)
  }
}


export const HandleDestroy = (deletedData) => async (dispatch) =>{

  try {
    console.log(deletedData)
    await Api.handleDestroy(deletedData);
    dispatch({type:"DELETE_IMG"})
  } catch (error) {
    console.log(error.response)
  }
}


export const deleteProduct = (id) => async (dispatch) =>{
  try {
    console.log(id)
    const { data } = await Api.deleteProduct(id);
    dispatch({type:"DELETE_PRODUCT", payload:data})
  } catch (error) {
    console.log(error.response)
  }
}

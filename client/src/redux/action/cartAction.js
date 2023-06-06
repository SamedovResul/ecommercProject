import Api from '../api/cartApi'


export const AddToCart = (cart) => async (dispatch) =>{

  try {
    
    const data = await Api.addToCart(cart)
    console.log(data)
    dispatch({ type:"ADDTOCART", payload:data })
  } catch (error) {
    console.log(error)
  }

}
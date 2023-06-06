import React,{useContext, useState, useEffect} from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'


const Order = () => {
  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  const [OrderInfo, setOrderInfo] = useState({
    district:'',
    village:'',
    street:'',
    home:'',
    phone:'',
    email:''
  })

  const orderHandler = async(e) => {
    e.preventDefault()

    // await axios.post('http://localhost:5000/api/payment', {cart, address}, {
    //     headers: {Authorization: token}
    // })

    console.log(cart, OrderInfo)

    // setCart([])
    // addToCart([])
    // alert("You have successfully placed an order.")
  }


  return (
    <article>
      {/* <div className="container">
        <div className="location">
          <p> Ünvan </p>
        </div>
        <form action="">
          <input type="text" name='rayon' required placeholder=' Rayon '
            onChange={(e) => setOrderInfo({
              ...OrderInfo, district: e.target.value
            })} />
          <input type="text" name='qesebe' required placeholder=' Qəsəbə '
            onChange={(e) => setOrderInfo({
              ...OrderInfo, village: e.target.value
            })} />
          <input type="text" name='kuce' required placeholder='küçə'
            onChange={(e) => setOrderInfo({
              ...OrderInfo, street: e.target.value
            })}/>
          <input type="text" name='ev' required placeholder=' ev  '
            onChange={(e) => setOrderInfo({
              ...OrderInfo, home: e.target.value
            })} />
          <input type="number" name="telefon" required placeholder=' Telefon ' 
            onChange={(e) => setOrderInfo({
              ...OrderInfo, phone: e.target.value
            })} />
          <input type="text" name='email'  placeholder='email'
            onChange={(e) => setOrderInfo({
              ...OrderInfo, email: e.target.value
            })} />
          <button type='submit' onClick={() => orderHandler() }> sifariş et </button>
        </form>
      </div> */}
    </article>
  )
}

export default Order
import {useState, useEffect} from 'react'
import {getUser,addToCart} from '../redux/action/userAction'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function UserAPI(token,API) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const dispatch = useDispatch()
    const state = useSelector((data)=> data.Auth.data);
    useEffect(() => {
        if(token){
            setIsLogged(true)
            state.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
            setCart(state.cart)
        }
        
    }, [state])
    
    useEffect(() =>{
        if(token){
            dispatch(getUser())
        }
    },[token,isAdmin])
    
    

    const addCart = (product) => {
        if(!isLogged) return alert("Please login to continue buying")

        const check = cart.every(item =>{
            return item._id !== product._id
        })
        console.log(cart)
        if(check){
            setCart([...cart, {...product, quantity: 1}])
            dispatch(addToCart({cart: [...cart, {...product, quantity: 1}]}))

        }else{
            alert("This product has been added to cart.")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory]
    }
}

export default UserAPI
 
import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct,HandleDestroy } from '../../../redux/action/action'



function Products() {
    const state = useContext(GlobalState);
    const State = useSelector((data) => data.reducer )
    // console.log(State.data.products)
    const [products, setProducts] = state.productsAPI.products
    // console.log(products)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const dispatch = useDispatch()
    const handleCheck = (id) =>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const DeleteProduct = async(id, public_id) => {
        try {
            setLoading(true)
            dispatch(deleteProduct({id}))
            dispatch(HandleDestroy({public_id}))
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        console.log(products)
        products.forEach(product => {
            
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        products.forEach(product => { 
            console.log(product)
            if(product.checked){
                dispatch(deleteProduct({id: `${product._id}` }))
                dispatch(HandleDestroy({public_id: `${product.images.public_id}`}))
            } 
        })
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
        <Filters />
        
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete ALL</button>
            </div>
        }

        <div className="products">
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product}
                    isAdmin={isAdmin} deleteProduct={DeleteProduct} handleCheck={handleCheck} />
                })
            } 
        </div>

        <LoadMore />
        {products.length === 0 && <Loading />}
        </>
    )
}

export default Products

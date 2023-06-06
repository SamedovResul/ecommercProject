import {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../redux/action/action';
import { useSelector } from 'react-redux';
function ProductsAPI() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    let state = useSelector((state) => state.reducer.data);
    let state2 = useSelector((state) => state.reducer);
    console.log(state2)
    useEffect(() => {
        if(state){
            setProducts(state)
            // setResult(state.result)
        }
        // console.log(state)
    }, [state])
    
    useEffect(() =>{
            dispatch(getAllProducts(category, sort, search, page))
    },[callback, category, sort, search, page])
    
    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default ProductsAPI

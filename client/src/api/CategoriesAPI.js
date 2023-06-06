import {useState, useEffect} from 'react'
import axios from 'axios'
import {GetCategories} from '../redux/action/categoriesAction'
import { useDispatch,useSelector } from 'react-redux';


function CategoriesAPI() {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)
    const category = useSelector((data) => data.category)
    
    
        
    useEffect(() =>{
        dispatch(GetCategories())
    },[callback])
    
    useEffect(() => {
        if(category.length !== 0){
            setCategories(category)
        }
    }, [category])
    
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoriesAPI

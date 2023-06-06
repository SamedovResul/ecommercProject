import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { CreateCategory,EditCategories,DeleteCategories } from '../../../redux/action/categoriesAction'

function Categories() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false);
    const [id, setID] = useState('');
    const dispatch = useDispatch()


    const createCategory = async e =>{
        e.preventDefault()
            if(onEdit){
                dispatch(EditCategories(id,{name: category}))
            }else{
                dispatch(CreateCategory({name: category}))
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)
    }

    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = (id) =>{
        dispatch(DeleteCategories(id))
    }

    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} required
                onChange={e => setCategory(e.target.value)} />

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>

            <div className="col">
                {
                    categories.map(category => (
                        <div className="row" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                                <button onClick={() => deleteCategory(category._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories

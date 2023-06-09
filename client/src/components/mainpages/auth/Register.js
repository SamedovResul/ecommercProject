import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import {registerUser} from '../../../redux/action/userAction'

function Register() {
    const [user, setUser] = useState({
        name:'', email:'', password: ''
    })
    const dispatch = useDispatch()

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        dispatch(registerUser(user))
        // try {
        //     // const accesstoken =  await axios.post('http://localhost:5000/user/register', {...user})
        //     // console.log(accesstoken.data)
        //     // localStorage.setItem('firstLogin', JSON.stringify(accesstoken.data))
            
            
        //     // window.location.href = "/";
        // } catch (err) {
        //     alert(err.response.data.msg)
        // }
    }

    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input type="text" name="name" required
                placeholder="Name" value={user.name} onChange={onChangeInput} />

                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register
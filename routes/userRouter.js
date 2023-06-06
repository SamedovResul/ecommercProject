import express from "express";
import userCtrl from '../controllers/userCtrl.js'
import auth from '../middleware/auth.js'
const router = express.Router()


const  {
  register, 
  login, 
  logout,
  refreshToken,
  getUser,
  addCart,
  history,
  test
} = userCtrl

router.post('/register', register )

router.post('/login', login)

router.get('/logout', logout)

router.get('/refresh_token', refreshToken)

router.get('/info', auth,  getUser)

router.patch('/addcart', auth, addCart)

router.get('/history', auth, history)



export default router
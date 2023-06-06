import express from "express";
import paymentCtrl from '../controllers/paymentCtrl.js'
import auth from '../middleware/auth.js'
import authAdmin from'../middleware/authAdmin.js'

const {getPayments, createPayment} = paymentCtrl

const router = express.Router()

router.route('/payment')
    .get(auth, authAdmin, getPayments)
    .post(auth, createPayment)


export default router

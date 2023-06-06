import express from "express";
import categoryCtrl from '../controllers/categoryCtrl.js'
import auth  from '../middleware/auth.js'
import authAdmin from '../middleware/authAdmin.js'

const {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory
} = categoryCtrl

const router = express.Router()

router.route('/category')
    .get( getCategories)
    .post(auth, authAdmin,  createCategory)

router.route('/category/:id')
    .delete(auth, authAdmin,  deleteCategory)
    .put(auth, authAdmin,  updateCategory)


export default router
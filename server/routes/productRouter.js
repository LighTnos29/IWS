import express from 'express'
import isLoggedIn from '../middlewares/isLoggedIn.js'
import isAdmin from '../middlewares/isAdmin.js'
const router = express.Router()
import {
    allProducts,
    bestsellerProducts,
    createProducts,
    product,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js'

router.get('/all', isLoggedIn, allProducts)
router.post('/create', isLoggedIn, isAdmin, createProducts)
router.get('/bestseller', bestsellerProducts)
router.get('/:id', isLoggedIn, product)
router.put('/update/:id', isLoggedIn, isAdmin, updateProduct)
router.delete('/delete/:id', isLoggedIn, isAdmin, deleteProduct)

export default router

import express from "express";
import cloudinary from 'cloudinary'
import auth from '../middleware/auth.js'
import authAdmin from '../middleware/authAdmin.js'
import fs from 'fs'
import upload from "../middleware/upload.js";
import productCtrl from "../controllers/productCtrl.js";

const {uploadImage} = productCtrl

const router = express.Router()
// we will upload image on cloudinary

const imgApi = () =>{

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    })

}



// Upload image only admin can use

router.post('/upload', upload.single('file'),uploadImage)

// Delete image only admin can use
router.post('/destroy',auth , authAdmin, (req, res) =>{

    imgApi()
    try {
        const {public_id} = req.body;
        console.log(public_id)
        if(!public_id) return res.status(400).json({msg: 'No images Selected'})

        cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
            if(err) throw err;

            res.json({msg: "Deleted Image"})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
})


const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

export default router
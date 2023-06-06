import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import path from 'path';
import user from './routes/userRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import upload from './routes/upload.js';
import productRouter from './routes/productRouter.js'
import paymentRouter from './routes/paymentRouter.js'
import cloudinary from 'cloudinary';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.use('/user', user)
app.use('/api', categoryRouter)
app.use('/api', upload, express.static(path.join(__dirname, 'tmp')))
app.use('/api', productRouter)
app.use('/api', paymentRouter)



// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.get('/', (req,res) =>{
    res.send("hello world")
  })


const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})


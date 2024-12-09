import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import { config, configDotenv } from 'dotenv';
import MDConnected from './db.js';
import User from './modelSchema/UserSchema.js'

configDotenv()

MDConnected();

const PORT = process.env.PORT || 8000;

const app = express()



app.use(bodyParser.json());

const allowedOrigins = [process.env.FRONTEND_URL];
app.use(
    cors({
        origin: function (origin, callback) {
            if(!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error('not allowed by CORS'));
            }
        },
        credentials: true,
    })
)

app.get('/', (req, res) => {
    res.json({
        message: 'ok it works'
    })
})


app.post('/register', async (req, res)=>{
    try{
        console.log(req.body)

        const {email, password} = req.body;
        let newUser = new User({
            email:email,
            password:password
        })

        await newUser.save()

        res.json({
            message: 'ok'
        }).status(200)
    }
    catch(e){
        res.json({
            message : 'error in register from backend'
        })
    }
})





app.listen(PORT, () => {
    console.log('server running at' + PORT)
})



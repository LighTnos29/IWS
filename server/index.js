import express from 'express'
import mongooseConnection from './config/mongooseConnection.js'

const app = express()

app.get('/',(req,res)=>{
    res.send('Hello hie bye')
})

app.listen(3000)
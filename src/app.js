const express=require('express')
const app=express()
const jwt=require('jsonwebtoken')

const port=process.env.PORT || 3000

// GET auth/checkauth
app.get('auth/checkauth',(req,res)=>{
    res.send('auth')
})


app.listen(port, console.log('Server started on PORT: ',port))
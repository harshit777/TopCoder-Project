const express=require('express')
const app=express()
const jwt=require('jsonwebtoken')

const port=process.env.PORT || 3000

// GET auth/checkauth
app.get('/auth/checkauth',(req,res)=>{
    res.send('auth')
})

//POST /billing/contracts/calculate-premium
app.post('/billing/contracts/calculate-premium',(req,res)=>{
    
})

// GET contracts
app.get('/group/contracts',(req,res)=>{

})

// GET validate
app.get('/group/validate',(req,res)=>{

})

// GET 
app.get('/contracts/check-active-coverage/:subscriberIdentifier/:effectiveDt',(req,res)=>{

})


app.listen(port, console.log('Server started on PORT: ',port))
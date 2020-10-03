const express=require('express')
const app=express()
const jwt=require('jsonwebtoken')
const fs = require('fs');



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

    var jsonData
    var groupIdentifier = req.params.groupIdentifier;
    var effectiveDt = req.params.effectiveDt
    var content = fs.readFileSync('data/calculate-premium-sample-response.json')
    var Subcheck = false
       jsonData = JSON.parse(content);
       res.setHeader('Content-Type', 'application/json');

       jsonData.forEach(element => {
        element.forEach(id => {
           if(id.groupIdentifier == groupIdentifier) {
                Subcheck = true;
            }
        });
    });

    if (Subcheck) {
        res.send("ACTIVE")
        res.status(200)
    } else {
        res.send("INACTIVE")
        res.status(200)
    }
    
});

// GET 
app.get('/contracts/check-active-coverage/:subscriberIdentifier/:effectiveDt',(req,res)=>{

    var jsonData
    var subscriberIdentifier = req.params.subscriberIdentifier;
    var effectiveDt = req.params.effectiveDt
    var content = fs.readFileSync('data/calculate-premium-sample-response.json')
    var Subcheck = false
       jsonData = JSON.parse(content);
       res.setHeader('Content-Type', 'application/json');

       jsonData.forEach(element => {
        element.forEach(id => {
           if(id.subscriberIdentifier == subscriberIdentifier && id.rateToDt == effectiveDt) {
                Subcheck = true;
            }
        });
    });

        if (Subcheck) {
            res.send("ACTIVE")
            res.status(200)
        } else {
            res.send("INACTIVE")
            res.status(200)
        }
        
    });

app.listen(port, console.log('Server started on PORT: ',port))
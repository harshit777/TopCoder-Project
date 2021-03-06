const express=require('express')
const app=express()
const jwt=require('jsonwebtoken')

const port=process.env.PORT || 3000

// Getting subscribers
const subs=require('../data/calculate-premium-sample-request.json')

// Function to generate token
// const token=function generateToken(id) {
//     const token=jwt.sign({s_id: id.toString()}, 'thisismysecret')
//     return token
// }
// console.log("Token: \n", token('WS9982535'))


// GET auth/checkauth
app.get('/auth/checkauth',async (req,res,next)=>{
    try {
        const token=req.header('Authorization').replace('Bearer ','')
        const decode=await jwt.verify(token,'thisismysecret')
        const user= subs.find(id=> {
            if(decode.s_id == id.subscriberIdentifier) return id      
        })

        if(!user) throw new Error('User Not Found!')
    
        res.status(200).send(user)   
        next()
        
} catch(err) {
    res.status(401).send({"Error":"Authentication Required"})
}
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
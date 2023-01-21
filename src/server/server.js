const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const User=require('./mongo-models/users');
const Product=require('./mongo-models/products');
const mongoBD=require('mongoose');
const { async, filter } = require('rxjs');
const products = require('./mongo-models/products');
const { json } = require('body-parser');



///        ---- Connect to local mongodb ----

// mongoBD.connect( 'mongodb://localhost/test_mongo',{useNewUrlParser:true},(err)=>{
// if(err)
//  console.log(err);
// else{
//     console.log("connect to mogo");
// }
// });

const url="mongodb+srv://KhAnter:KhaledAnter123@angularproject.wqzhkqi.mongodb.net/?retryWrites=true&w=majority";
async function connectToMongo(){
    try{    
        await mongoBD.connect(url);
        console.log("connect to mongodb");
    }catch(err){
       console.log("error when connect to mongo",err);
    }
}
connectToMongo();

const PORT=3001;
const app=express();
app.use(bodyParser.json());
app.use(cors());


app.get('/',function(req,res){
    res.send("Done");
})
app.listen(PORT,function(){
    console.log(`server run on port ${PORT}`);
})

app.post('/signUp',function(req,res){
    User.find({email:(req.body.email)},(err,findRes)=>{
        if(err){
            console.log("error when find email");
            return;
        }
        if(findRes !=''){
            res.status(200).send({"result":"email already exist"})
            return;
        }else{
            const newUser=new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                mobileNo: req.body.mobileNo,
                address1: req.body.address1,
                address2: req.body.address2,
                country: req.body.country,
                city: req.body.city,
                state: req.body.state,
                ZIPcode: req.body.ZIPcode
            });
            newUser.save((err,res)=>{
                if(err){
                    console.log("an error in mongoDB");
                    return;
                }
                console.log("done");
            });
            res.status(200).send({"result":"done"})
        }
    })
})
app.post('/login',function(req,res){
    User.find({email:(req.body.EmailName),password:(req.body.PasswordName)},(err,findRes)=>{
        if(err){
            console.log("error when find email");
            return;
        }
        if(findRes ==''){
            res.status(200).send({"result":"wrong email or password"})
            return;
        }else{
            res.status(200).send({"result":"done","userData":findRes})
        }
    })
})

app.get('/accounts',function(req,res){
    User.find({},(err,findRes)=>{
      //  res.send(findRes);
        if(err){
            console.log("error when find accounts");
            return;
        }else{
            res.status(200).send(findRes);
        }
    })
})

app.post('/addproduct',function(req,res){
    const newProduct=new Product({
        id: req.body.pId,
        name:req.body.pName,
        price:req.body.price,
        color:req.body.color,
        size:req.body.size,
        rate:req.body.rate,
        pictureLink:req.body.pictureLink,
        description:req.body.des,
    });
    newProduct.save((err,res)=>{
        if(err){
            console.log("an error in mongoDB");
            return;
        }
        console.log("done");
    });
    res.status(200).send({"result":"done"})
})

app.get('/getProducts',function(req,res){
    // let total="";
    // if(req.query.page && req.query.limit){
    //   console.log("price query :",req.query.priceQuery);
    //   console.log("color query :",req.query.colorQuery);
    //   console.log("size query :",req.query.sizeQuery);
    //   arr=[req.query.priceQuery,req.query.colorQuery,req.query.sizeQuery];

    //     for(let i=0;i<3;i++){
    //         if(arr[i] !="" && i==0){
    //             total=arr[i];
    //         }else if(arr[i] !=""){
    //             total=total+","+arr[i];
    //         }}


    // Product.paginate({total},{page:req.query.page,limit:req.query.limit}).then((response)=>{
    //     res.json(response);
    // }).catch((error)=>{
    //     res.json({
    //         message:"An error occured when paginate "+error
    //     })
    // });}else{

    Product.find({},(err,findRes)=>{
        if(err){
            console.log("error when find accounts");
            return;
        }else{
            res.status(200).send(findRes);
        }
    });
})







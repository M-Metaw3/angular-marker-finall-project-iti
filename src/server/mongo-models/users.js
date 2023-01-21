const mongoDB=require('mongoose')

const userSchema=mongoDB.Schema({
    firstname:{
        require:true,
        type: String,
    },
    lastname:{
        require:true,
        type: String,
    },
    email:{
        require:true,
        type: String,
    },
    password:{
        require:true,
        type: String,
    },
    mobileNo:{
        require:true,
        type: String,
    },
    address1:{
        require:true,
        type: String,
    },
    address2:{
        require:false,
        type: String,
    },
    country:{
        require:true,
        type: String,
    },
    city:{
        require:true,
        type: String,
    },
    state:{
        require:true,
        type: String,
    },
    ZIPcode:{
        require:true,
        type: String,
    }
});

module.exports = mongoDB.model("User",userSchema);
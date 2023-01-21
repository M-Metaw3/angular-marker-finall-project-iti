const mongoDB=require('mongoose')
const mongoosePaginate = require('mongoose-paginate');

const productSchema=mongoDB.Schema({
    id:{
        require:true,
        type: Number,
    },
    name:{
        require:true,
        type: String,
    },
    price:{
        require:true,
        type: Number,
    },
    color:{
        require:false,
        type: String,
    },
    size:{
        require:false,
        type: String,
    },
    pictureLink:{
        require:true,
        type: String,
    },
    description:{
        require:true,
        type: String,
    },

});

productSchema.plugin(mongoosePaginate);

module.exports = mongoDB.model("Product",productSchema);
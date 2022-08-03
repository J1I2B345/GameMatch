const {Schema, model} = require ('mongoose')


const schema = new Schema({    
    userRated:{
        type: mongoose.Schema.Types.ObjectId,
        referece: 'Users',
        required:true
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        referece: 'Users',
        required:true
    },
    qualification: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: false
    }
})

module.exports = model('Reviews', schema)
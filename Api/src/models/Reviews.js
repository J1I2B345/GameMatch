const {Schema, model} = require ('mongoose')


const schema = new Schema({    
    userRated:{
        type: mongoose.Schema.Types.ObjectId,
        referece: 'User2',
        required:true
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        referece: 'User2',
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

module.exports = model('Review', schema)
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
        required: true
    }
})

module.exports = model('Reviews', schema)
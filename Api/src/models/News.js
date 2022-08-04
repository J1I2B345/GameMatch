const {Schema, model} = require ('mongoose')


const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        reference: 'Users2',
        required: true,

    }
},{
    timestamps: true
})


module.exports = model('News', schema)
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
        type: Schema.Types.ObjectId,
        reference: 'Users2',
        required: true,

    },
    editedBy: {
        type: Schema.Types.ObjectId,
        reference: 'Users2',
    }
},{
    timestamps: true
})


module.exports = model('News', schema)
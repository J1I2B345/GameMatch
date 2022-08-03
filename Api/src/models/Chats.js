const {Schema, model, default: mongoose} = require ('mongoose')

const schema = new Schema({
    message: {
        type: String,
        required: true
    },
    //en array se guardan los _id de los users involucrados
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        referece: 'Users',
        required: true
    },
    date: new Date()
})
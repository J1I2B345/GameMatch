const {Schema, model} = require ('mongoose')



const schema = new Schema({
    message: {
        type: String,
        required: true
    },
    //en array se guardan los _id de los users involucrados
    users: {
        type: [{
            type: Schema.Types.ObjectId,
            referece: 'User2',
            required: true}, 
        {
            type: Schema.Types.ObjectId,
            referece: 'User2',
            required: true
        }],
    },
    sender: {
        type: Schema.Types.ObjectId,
        referece: 'User2',
        required: true
    },
},{
    timestamps: true
})
schema.pre('validate', function(next) {
    if (this.users.length !== 2) throw new Error ("must have sender and receiver");
    next();
});

module.exports = model('Chat', schema)
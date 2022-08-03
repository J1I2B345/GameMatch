const { Schema, model }  = require ('mongoose')



const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    //reviews pasarlo por referencia para que sea más rápida la carga
    reviews: Array, 
    // rating podría actualizarse cuando se hace el post de reviews de la siguiente manera
    // reviews.length*rating+newReviewValue/reviews.length+1
    // esto se puede hacer con un middleware antes de que se actualice el reviews.
    givenReviews: Array,
    rating: Number,
    premium: {
        type: Boolean,
        default: false
    },
    rol: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'user'
    },
    //chats podría ser un array de mongoose.Types.ObjectId de los users. cuando se abre la pestaña de chats lo que 
    //haría sería ir a buscar a la base de datos los nombres y crear los posibles chats que se puedan elegir.
    chats: Array

    // username: {
    //     type: String,
    //     required: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // }
})

module.exports = model('Users', schema)
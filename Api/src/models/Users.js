const { Schema, model }  = require ('mongoose')



const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    
    // rating podría actualizarse cuando se hace el post de reviews de la siguiente manera
    // reviews.length*rating+newReviewValue/reviews.length+1
    //  (3.5*500+4)/51
    // esto se puede hacer con un middleware antes de que se actualice el reviews.
    rating:{
        type: Schema.Types.Decimal128,
    },
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
    // chats_id
    chats: Array,
    //reviews pasarlo por referencia para que sea más rápida la carga _id de las reviews
    reviews: Array, 
    givenReviews: Array,
    img: {
        type: String,
        default: 'https://randomwordgenerator.com/img/picture-generator/55e1d4414e51aa14f1dc8460962e33791c3ad6e04e507749772f78d69f4acc_640.jpg'
    },

    description: String,
    socialNetworks: {
        steam: String,
        riot: String,
        ig: String,
        discord: String,
        twitter: String,
    },
    ban: {
        type: Boolean,
        default: false
    },
    tenant: String,
    connection: String,
    debug: Boolean
})

module.exports = model('Users', schema)
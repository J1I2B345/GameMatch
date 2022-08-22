const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const schema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			defaul: "not declared Add a name !:)",
			unique: true,
			trim: true,
		},

		// rating podría actualizarse cuando se hace el post de reviews de la siguiente manera
		// reviews.length*rating+newReviewValue/reviews.length+1
		//  (3.5*500+4)/51
		// esto se puede hacer con un middleware antes de que se actualice el reviews.
		rating: {
			type: Schema.Types.Decimal128,
			default: 0,
		},
		premium: {
			type: Boolean,
			default: false,
		},
		roles: [
			{
				type: Schema.Types.ObjectId,
				ref: "Role",
			},
		],
		//chats podría ser un array de mongoose.Types.ObjectId de los users. cuando se abre la pestaña de chats lo que
		//haría sería ir a buscar a la base de datos los nombres y crear los posibles chats que se puedan elegir.
		// chats_id
		chats: {
			type: [
				{
					type: Schema.Types.ObjectId,
					referece: "Users",
				},
			],
		},
		//reviews pasarlo por referencia para que sea más rápida la carga _id de las reviews
		reviews: Array,
		givenReviews: Array,
		img: {
			secure_url: String,
			public_id: String,
			// default:
			// 	"https://dpwhatsapp.xyz/wp-content/uploads/2021/05/Gamers-Image-WhatsApp-DP.jpg",
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
			default: false,
		},
		reports: {
			type: String,
			reference: "ReportUsers",
		},
		matchs: {
			type: Number,
			default: 10,
		},
		dark: {
			type: Boolean,
			default: false,
		},
		tenant: String,
		connection: String,
		debug: Boolean,
	},
	{ timestamps: true, versionKey: false }
);

//*----------------toma la pass e incripta
schema.statics.encryptPassword = async (password) => {
	//SALT ES UN METODO DE APLICAR EL ALGORITMO DE ENCRYPTED
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt); //HASH CONTRASEÑA CIFRADA
};
schema.statics.comparePassword = async (password, receivedPassword) => {
	return await bcrypt.compare(password, receivedPassword);
};
schema.pre("save", async function (next) {
	const user = this;
	if (!user.isModified("password")) {
		return next();
	}
	const hash = await bcrypt.hash(user.password, 10);
	user.password = hash;
	next();
});

module.exports = model("Users", schema);

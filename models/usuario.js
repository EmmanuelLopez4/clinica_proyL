import mongoose from "mongoose"

const usuarioSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['normal', 'administrador'],
		default: 'normal',
	}
})

export default mongoose.model("Usuario", usuarioSchema)
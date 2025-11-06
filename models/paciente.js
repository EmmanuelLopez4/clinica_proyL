import mongoose from "mongoose"

const pacienteSchema = new mongoose.Schema({
	firstName:{
		type: String,
		required:true,
		trim:true,
	},
	lastName:{
		type: String,
		required:true,
		trim: true,
	},
    phone: {
        type: String,
        trim: true,
        unique: false,
    },
    email: {
        type: String,
        trim: true,
        unique: false,
    }
})

export default mongoose.model("Paciente", pacienteSchema)
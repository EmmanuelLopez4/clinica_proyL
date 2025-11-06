import mongoose from "mongoose"

const citaSchema = new mongoose.Schema({
    dentist: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
})

export default mongoose.model("Cita", citaSchema)
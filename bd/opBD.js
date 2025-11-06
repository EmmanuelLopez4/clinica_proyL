import Paciente from "../models/paciente.js";
import Cita from "../models/cita.js";

export async function crearPaciente(datosPaciente) {
	const paciente = new Paciente(datosPaciente);
	const respuestaMongo = await paciente.save();
	return respuestaMongo;
}

export async function obtenerPacientes(query = {}) {
    if (query.q) {
        const busqueda = new RegExp(query.q, 'i');
        const pacientesBD = await Paciente.find({
            $or: [
                { firstName: busqueda },
                { lastName: busqueda },
                { phone: busqueda },
                { email: busqueda }
            ]
        });
        return pacientesBD;
    }
    
	const pacientesBD = await Paciente.find();
	return pacientesBD;
}

export async function actualizarPaciente(id, datosActualizados) {
	const pacienteBD = await Paciente.findByIdAndUpdate(id, datosActualizados, { new: true });
	return pacienteBD;
}

export async function eliminarPaciente(id) {
    const pacienteBD = await Paciente.findByIdAndDelete(id);
    return pacienteBD;
}

export async function crearCita(datosCita) {
    const cita = new Cita(datosCita);
    const respuestaMongo = await cita.save();
    return respuestaMongo;
}

export async function obtenerCitas() {
    const citasBD = await Cita.find().populate('paciente');
    return citasBD;
}

export async function actualizarCita(id, datosActualizados) {
    const citaBD = await Cita.findByIdAndUpdate(id, datosActualizados, { new: true });
    return citaBD;
}

export async function eliminarCita(id) {
    const citaBD = await Cita.findByIdAndDelete(id);
    return citaBD;
}

export async function buscarPorID(id, coleccion) {
    if (coleccion === 'pacientes') {
        return await Paciente.findById(id);
    }
    if (coleccion === 'citas') {
        return await Cita.findById(id).populate('paciente'); 
    }
    return null;
}
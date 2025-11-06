import { Router } from "express"; 
import * as opBD from "../bd/opBD.js"; 

const rutasP = Router(); 

rutasP.get("/pacientes", async (req, res) => {
    const pacientesBD = await opBD.obtenerPacientes(); 
    res.render("pacientes", { 
        titulo: "Gestión de Pacientes", 
        pacientesBD: pacientesBD, 
        message: ""
    });
});

rutasP.get("/pacientes/editar/:id", async (req, res) => {
    const id = req.params.id;
    const paciente = await opBD.buscarPorID(id, 'pacientes');
    if (!paciente) {
         return res.redirect("/pacientes"); 
    }
    res.render("editarPaciente", { 
        titulo: "Modificar Paciente", 
        paciente: paciente 
    });
});


rutasP.post("/api/pacientes", async (req, res) => {
    try {
        await opBD.crearPaciente(req.body);
        res.redirect("/pacientes"); 
    } catch (error) {
        console.error("Error al crear paciente:", error);
        res.redirect("/pacientes");
    }
});


rutasP.post("/api/pacientes/editar", async (req, res) => {
    try {
        const { id, ...datosActualizados } = req.body;
        await opBD.actualizarPaciente(id, datosActualizados);
        res.redirect("/pacientes"); 
    } catch (error) {
        console.error("Error al actualizar paciente:", error);
        res.redirect("/pacientes");
    }
});


rutasP.post("/api/pacientes/borrar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await opBD.eliminarPaciente(id);
        res.redirect("/pacientes");
    } catch (error) {
        console.error("Error al borrar paciente:", error);
        res.redirect("/pacientes");
    }
});


export default rutasP;
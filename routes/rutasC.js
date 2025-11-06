import { Router } from "express";
import * as opBD from "../bd/opBD.js"; 

const rutasC = Router(); 

function convertirFecha(fechaString) {
    if (!fechaString) return null;

    const partes = fechaString.split('/');
    if (partes.length === 3) {

        return `${partes[1]}/${partes[0]}/${partes[2]}`; 
    }
    return fechaString; 
}

rutasC.get("/citas", async (req, res) => {
    try {
        const citasBD = await opBD.obtenerCitas(); 
        res.render("citas", { 
            titulo: "Gestión de Citas", 
            citasBD: citasBD
        });
    } catch (error) {
        console.error("Error al obtener citas:", error);
        res.render("citas", { titulo: "Gestión de Citas", citasBD: [] });
    }
});

rutasC.get("/citas/editar/:id", async (req, res) => {
    const id = req.params.id;
    const cita = await opBD.buscarPorID(id, 'citas');
    if (!cita) {
         return res.redirect("/citas"); 
    }
    res.render("editarCita", { 
        titulo: "Modificar Cita", 
        cita: cita 
    });
});

rutasC.post("/api/citas", async (req, res) => {
    try {
        const datosCita = { ...req.body };
        datosCita.date = convertirFecha(req.body.date); 

        await opBD.crearCita(datosCita);
        res.redirect("/citas"); 
    } catch (error) {
        console.error("ERROR AL GUARDAR LA CITA:", error);
        res.redirect("/citas");
    }
});

rutasC.post("/api/citas/editar", async (req, res) => {
    try {
        const { id, ...datosActualizados } = req.body;
        
        datosActualizados.date = convertirFecha(datosActualizados.date); 

        await opBD.actualizarCita(id, datosActualizados);
        res.redirect("/citas"); 
    } catch (error) {
        console.error("Error al actualizar cita:", error);
        res.redirect("/citas");
    }
});

rutasC.post("/api/citas/borrar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await opBD.eliminarCita(id);
        res.redirect("/citas");
    } catch (error) {
        console.error("Error al borrar cita:", error);
        res.redirect("/citas");
    }
});

export default rutasC;
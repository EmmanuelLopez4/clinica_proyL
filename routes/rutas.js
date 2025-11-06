import { Router } from "express";
import * as opBD from "../bd/opBD.js"; 
import rutasP from "./rutasP.js";
import rutasC from "./rutasC.js"; 

const router = Router();

router.get("/", (req, res) => {
    res.render("home", { titulo: "Panel Principal" });
});

router.use('/', rutasP); 
router.use('/', rutasC);

router.get('/estado', (req, res) => res.send({estado: 'ok', proyecto: 'Clinica Dental Backend'}));

router.get("/reporte", async (req, res) => {
    try {
        const citasBD = await opBD.obtenerCitas();
        const pacientesBD = await opBD.obtenerPacientes();

        res.render("reporte", { 
            titulo: "Reporte General", 
            citasBD: citasBD,
            pacientesBD: pacientesBD
        });
    } catch (error) {
        console.error("Error al generar el reporte:", error);
        res.redirect("/"); 
    }
});


export default router;
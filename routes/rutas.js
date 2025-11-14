import { Router } from "express"; 
import * as opBD from "../bd/opBD.js"; 
import rutasP from "./rutasP.js";
import rutasC from "./rutasC.js"; 
import Usuario from "../models/usuario.js"; 

const router = Router(); 

function verificarAutenticacion(req, res, next) {
    if (req.session.userId) {
        res.locals.role = req.session.role; 
        next(); 
    } else {
        res.redirect('/login'); 
    }
}

function verificarAdministrador(req, res, next) {
    if (req.session.role === 'administrador') {
        next(); 
    } else {
        res.redirect('/'); 
    }
}

function convertirFechaISO(fechaString) {
    if (!fechaString) return null;
    const partes = fechaString.split('/');
    if (partes.length === 3) {
        const dia = partes[0];
        const mes = partes[1];
        const anio = partes[2];
        const fechaISO = new Date(`${anio}-${mes}-${dia}T00:00:00.000Z`);
        if (!isNaN(fechaISO)) {
            return fechaISO;
        }
    }
    return fechaString; 
}


router.get("/login", (req, res) => {
    if (req.session.userId) return res.redirect('/'); 
    res.render("login", { titulo: "Iniciar Sesión", error: null });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    const user = await Usuario.findOne({ username });

    if (user && user.password === password) { 
        req.session.userId = user._id;
        req.session.role = user.role;
        return res.redirect('/'); 
    } else {
        return res.render("login", { titulo: "Iniciar Sesión", error: "Usuario o Contraseña incorrectos." });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.redirect('/');
        }
        res.clearCookie(process.env.NOMBRE_COOKIE, {path:"/"}); 
        res.redirect('/login'); 
    });
});


router.get("/", (req, res) => {
    const isAdmin = req.session.role === 'administrador'; 
    res.render("home", { titulo: "Panel Principal", isAdmin: isAdmin });
});

router.get('/estado', (req, res) => res.send({estado: 'ok', proyecto: 'Clinica Dental Backend'}));


router.use('/pacientes', verificarAutenticacion);
router.use('/citas', verificarAutenticacion);


router.get("/admin/usuarios", verificarAdministrador, (req, res) => {
    res.send("<h1>Panel de Administración de Usuarios</h1><p>Solo visible para administradores.</p><a href='/'>Volver</a>");
});

router.get("/reporte", verificarAdministrador, async (req, res) => {
    try {
        const citasBD = await opBD.obtenerCitas();
        const pacientesBD = await opBD.obtenerPacientes();
        res.render("reporte", { titulo: "Reporte General", citasBD: citasBD, pacientesBD: pacientesBD });
    } catch (error) {
        console.error("Error al generar el reporte:", error);
        res.redirect("/"); 
    }
});


router.use('/', rutasP); 
router.use('/', rutasC); 


export default router;
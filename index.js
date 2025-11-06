
import 'dotenv/config'; 
import express from 'express';

import morgan from 'morgan';
import cors from 'cors';

import conectarBD from './bd/bd.js';

import rutas from "./routes/rutas.js"; 

conectarBD(); 

const app = express();

app.set("view engine", "ejs"); 
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cors());         
app.use(morgan('dev'));  

app.use("/", rutas); 


const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
  console.log(" http://localhost:${PORT} ");
});
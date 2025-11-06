import mongoose from "mongoose"

async function conectarBD(){
	try{
		const repuestaMongo = await mongoose.connect("mongodb+srv://david5:hola@cluster0.oytnytl.mongodb.net/?retryWrites=true&w=majority&appName=backend1")
		
		console.log("Conexión con MongoDB Atlas exitosa.")
	}
	catch(err){
		console.log("Error en la conexión a la base de datos: "+err)
	}
}

export default conectarBD;
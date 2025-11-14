import mongoose from "mongoose";

async function conectarBD(){
	try{
		const repuestaMongo = await mongoose.connect(process.env.SECRET_MONGO); 
		console.log("Conexión con MongoDB Atlas");
	}
	catch(err){
		console.log("Error en la conexión a MongoDB: "+ err.message);
        throw err; 
	}
}

export default conectarBD;
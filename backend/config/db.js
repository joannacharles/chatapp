const mongoose=require("mongoose")

const connectDB= async ()=>{
    try{
        const con= await mongoose.connect(process.env.CONNECTION_STRING,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log(`Mongo :D ${con.connection.host}`)
    }
    catch(e){
        console.log("db err============= ",e.message)
    }
}

module.exports=connectDB
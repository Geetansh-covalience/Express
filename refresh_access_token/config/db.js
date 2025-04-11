import  { Sequelize } from "sequelize"
import mysql2 from "mysql2"

const sql = new Sequelize("geetansh","geetansh","geetansh",{
    host:"localhost",
    pool:{
        max:10,
        min:2,
        acquire:30*1000,
        idle:15*1000
    },
    dialect:"mysql",
    logging:false
})

async function authn(){
    try{
        await sql.authenticate()
        console.log("connected");
        
    } catch(err){
         console.log(err);
         
    }
}

authn()

export default sql
const prisma = require("../lib/prisma");

const createCompany = async (req , res) =>{
    try{
        res.json({
            messages : "create Company working",
        });
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success: false,
            messages: "Internal server error"
        });
    }
};

module.exports ={
    createCompany,
}
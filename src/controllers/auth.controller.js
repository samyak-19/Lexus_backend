const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try{
        res.json({
            message:"Register controller working",
        });
    }catch(error){
        console.error(error);

        res.status(500).json({
            success: false,
            message : "Internal server error",
        })
    }
};

module.exports={
    register,
};
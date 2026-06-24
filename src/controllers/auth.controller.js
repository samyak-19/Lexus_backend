const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try{

      const {name , email , password} = req.body
        // valitation
        if(!name){
            return res.status(400).json({
                success: false,
                message: "name is require",
            });
        }

        if(!email){
            return res.status(400).json({
                success:false,
                message:"email is erquire",
            });
        }

        if(!password){
            return res.status(400).json({
                success:false,
                message:"password is require",
            });
        }

        if(password.length < 8){
            return res.status(400).json({
                success:false,
                message:"password must be at least 8 charactere",
            });
        }

        // user exist
        const existingUser = await prisma.user.findUnique({
            where:{
                email
            },
        });

        if(existingUser){
            return res.status(409).json({
                success:false,
                message: "Email already exists",
            });
        }

        // hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
            },
        });

        return res.status(201).json({
            success:true,
            message: "User regestion Succefully",
        });

    }catch(error){
        console.error(error);

        res.status(500).json({
            success: false,
            message : "Internal server error",
        });
    }
};

module.exports={
    register,
};
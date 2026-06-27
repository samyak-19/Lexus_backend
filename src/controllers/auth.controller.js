const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const login = async (req , res) =>{
    try{
        const{email, password} = req.body;

        if(!email){
            return res.status(400).json({
                success: false,
                message: "email is required",
            });
        }

        if(!password){
             return res.status(400).json({
            success : false,
            message : "password is required",
        });
        }
       

        const user = await prisma.user.findUnique({
            where :{
                email,
            },
        });

        if(!user){
            return res.status(400).json({
                success: false,
                message :"Invalid email or password ",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if(!isPasswordValid){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // generating jwt token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        return res.status(200).json({
            success: true,
            message: "login successful",
            token,
        });
    } catch(error){
        console.error(error);

        return res.status(500).json({
            success:false,
            message :"Internal server Error",       
        });
    }
};

module.exports={
    register,
    login,
};
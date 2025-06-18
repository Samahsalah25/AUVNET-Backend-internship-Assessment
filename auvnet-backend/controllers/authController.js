const User=require("../models/User");
const generateToken=require("../utils/generateToken");
const {registerSchema ,loginSchema}=require("../validations/authValidation");


const register = async (req, res) => {
    try {
     
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                message: "Validation error",
                details: error.details.map(err => err.message) 
            });
        }

        const { name, userName, email, password } = req.body;

       
        const existingUser = await User.findOne({ 
            $or: [{ email }, { userName }] 
        });

        if (existingUser) {
            const conflictField = existingUser.email === email ? 'Email' : 'Username';
            return res.status(400).json({ 
                message: `${conflictField} already in use` 
            });
        }

    
        const newUser = await User.create({ 
            name,
            userName,
            email,
            password, 
            type: "user" 
        });

    
        const userResponse = newUser.toObject();
        delete userResponse.password;
console.log("sucee");

        return res.status(201).json({
            message: "User registered successfully",
            user: userResponse
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
    }
};

// login here (user OR admin)
const loginUser = async (req, res) => {
    try {
      const { error } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const { userName, password } = req.body;
  
      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(401).json({ message: "Invalid userName or password" });
      }

      
  
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    
      

      res.status(200).json({
        message: "Logged in successfully",
        user: {
          id: user._id,
          userName: user.userName,
          name:user.name,
          email: user.email,
          type: user.type,
          token: generateToken(res, user._id),
        }
      });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: err.message });
    }
  };


  // 3 logout 
  const logoutUser = (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), //delete cookies
    });
    res.status(200).json({ message: "Logged out successfully" });
  };
  
  module.exports = {
    register,
    loginUser,
    logoutUser
  };


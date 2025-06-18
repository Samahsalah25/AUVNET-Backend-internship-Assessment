const User=require("../models/User")
const {registerSchema  ,editAdminSchema }=require("../validations/authValidation");
const bcrypt =require("bcrypt")

//get all Admins
const getallAdmin=async (req,res) => {
    try{
        const allAdmin= await User.find({type:"admin"})
        res.status(200).json(allAdmin);

    }catch(error)
    {
        res.status(404).json({message:error.message})
    }
}


// get all user
const getallUsers=async (req,res) => {
    try{
        const allAdmin= await User.find({type:"user"})
        res.status(200).json(allAdmin);

    }catch(error)
    {
        res.status(404).json({message:error.message})
    }
    
}
//delete user or admin
const deleteUser=async(req,res)=>{
    try{
        const userId=req.params.id;
        const deletedUser =await User.findByIdAndDelete(userId);
        res.status(202).json("the user is deleted")
    }catch(error)
    {
        res.status(404).json({message:error.message});
    }
}


// create new admin

const createAdmin = async (req, res) => {
    try {
        // التحقق من صحة البيانات
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name, userName, email, password } = req.body;

      
        const existingUser = await User.findOne({ 
            $or: [
                { email },
                { userName }
            ]
        });
        
        if (existingUser) {
            const conflictField = existingUser.email === email ? 'Email' : 'Username';
            return res.status(400).json({ 
                message: `${conflictField} already exists, please use another one` 
            });
        }
         
     
           console.log("admin");
      
        const newAdmin = await User.create({
            name,
            userName,
            email,
            password,
            type: "admin"
        });


        res.status(201).json({
            message: "Admin created successfully",
            admin: {
                _id: newAdmin._id,
                name: newAdmin.name,
                userName: newAdmin.userName,
                email: newAdmin.email,
                type: newAdmin.type
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};



// update user
const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, userName, email, password ,type} = req.body;
     
        const { error } = editAdminSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
console.log("hi");

        const existingUser = await User.findOne({
            $or: [
                { email, _id: { $ne: id } },
                { userName, _id: { $ne: id } }
            ]
        });

        if (existingUser) {
            const conflictField = existingUser.email === email ? 'Email' : 'Username';
            return res.status(400).json({
                message: `${conflictField} already in use by another user`
            });
        }

      
        const updateData = {
            name,
            userName,
            email,
            type
        };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedAdmin = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Admin updated successfully",
            admin: {
                _id: updatedAdmin._id,
                name: updatedAdmin.name,
                userName: updatedAdmin.userName,
                email: updatedAdmin.email,
                type: updatedAdmin.type
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

//get admin by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports={createAdmin ,getallAdmin,getallUsers ,deleteUser ,updateAdmin ,getUserById};
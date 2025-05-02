import Publisher from "../models/publishers.js";


export const getPublishers= async ( req, res)=>
{
    try{
const publishers = await Publisher.find();
res.json(publishers);    }
    catch(error){
console.log("Not found any data");
    }
};


export const createpublisher=async(req,res)=>
{
    //console.log("Post API reached");
    const pname =req.body.pname;
    const pnameintostringformat= pname.toString();
    const email = req.body.email;
    const emailintostringformat = email.toString();

    const password= req.body.password;
    const passwordintostringformat= password.toString();

    const reppassword= req.body.reppassword;
    const reppasswordintostringformat= password.toString();
    
   
   
   
   
   

    const newpublisher = new Publisher({
username: pnameintostringformat,
  email: emailintostringformat,
  password: passwordintostringformat,
  
  reppassword:passwordintostringformat,
    });
    try{
        await newpublisher.save();
        res.json(newpublisher);
    }
    catch(error){
        console.log("Not saved..");
    }
}
export const deleteUser = async (req,res) => {
    try {
        await Publisher.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User Deleted" });

    } catch (error) {
        console.log("Delete Failed");
    }
}
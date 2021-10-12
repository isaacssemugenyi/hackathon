const UserModel = require('../models/users')
const bcrypt = require('bcrypt');


exports.UserController = {
    async getusers(req, res) {
        try {
            const response = await UserModel.find();
            return res.json(response);
        } catch(err){
            throw new Error("Failed to get users");
        }
    },
    async createNewUser(req, res) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        try {
            const response = await UserModel.create({
                fullname:  req.body.fullname,
                username:req.body.username,
                email:req.body.email,
                bank: req.body.bank,
                accNo: req.body.accNo,
                password: req.body.password,
                mobile: req.body.mobile,
                gender: req.body.gender
               
            });
            return res.json({response:response._id});
        } catch(err){
            console.log(err)
            throw new Error("Failed to post users");
        }
    },
    // async updateUser(req, res) {
    //     try {
    //         const id = req.params.id;
    //         const response = await UserModel.findByIdAndUpdate({_id: id}, req.body, {new: true});
    //         return res.json(response);
    //     } catch(err){
    //         throw new Error("Failed to updated user");
    //     }
    // },
    // async deleteUser(req, res) {
    //     try {
    //         const id = req.params.id;
    //         const response = await UserModel.findByIdAndDelete({_id: id});
    //         return res.json({message: 'Resource deleted successfully'});
    //     } catch(err){
    //         throw new Error("Failed to delete user");
    //     }
    // },

    async loginUser(req, res) {
        try {
            const user = await UserModel.findOne({email:req.body.email});
            if(!user){
            return res.json({message: 'Email not found'});   
            }
            //correct password
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if(!validPass) return res.status(400).send('Invalid Password');   
                
                res.send("logged in")
        
        } catch(err){
           console.log(err) 
            throw new Error("Failed to login user");
        }
    }

}
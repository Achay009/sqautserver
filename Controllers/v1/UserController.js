const User = require('../../Models/User')
const Model = require('../../Models/Models');
const Post =  Model.Post;
const Transaction = Model.Transaction;
const Image = Model.Image;


module.exports = {
    index : async function(req,res,next){
        
       try{
        var user = await User.findById(req.user.user);
        var post = await Post.find();
        

        if(!user){
            return res.status(204).json({
                data : {},
                message : 'No User Content'
            })
        }
        return res.status(200).json({
            data : user,
            post : post,
            message : 'Inside UserController'
        })
       }catch(error){
        return res.status(500).json({
            data : {},
            status : 500,
            message : 'Internal Server Error Idiot'
        })
       }




    }
}
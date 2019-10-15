const User = require('../../Models/User')
const Model = require('../../Models/Models');
const Post =  Model.Post;
const Transaction = Model.Transaction;
const Image = Model.Image;


module.exports = {
    index : async function(req,res,next){
        
       try{
        var user = await User.findById(req.user.user);
        var post = await Post.find({Host : req.user.user});
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




    },

    getUserTransaction : async function(req,res,next){
        let userId = req.user.user;
        try{

            let userTransactions = await Transaction.find({Host : userId});
            return res.status(200).json({
                data : userTransactions,
                status : 200,
                message : 'success'
            })
        }catch{
            return res.status(500).json({
                data : {},
                status : 500,
                message : 'Internal Server Error'

            })
        }
       
    },
    getAllUserListings : async function(req,res,next){
        try{
            
        let user = await User.findById(req.user.user);
        let userListing = await Post.find({User : user._id});

        if(!userListing){
            return res.status(204).json({
                data : {},
                message : 'No user content'
            })
        }
        res.status(200).json({
            data : userListing,
            message : 'success'
        })


        }catch{
            return res.status(500).json({
                data : {},
                message : 'Internal Server Error'
            })
        }

    }


}
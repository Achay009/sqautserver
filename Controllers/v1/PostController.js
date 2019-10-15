const User = require('../../Models/User')
const Model = require('../../Models/Models');
const Post =  Model.Post;
const Transaction = Model.Transaction;
const Image = Model.Image;
const Bid = Model.Bid;


module.exports = {
    index : function(req,res,next){

        const LISTTYPE = Object.freeze({
            ROOM: 'Room',
            SHARED_ROOM : 'Shared Room',
            SHARED_APARTMENT : 'Shared Apartment',
        })

        res.status(200).json({
            data : LISTTYPE,
         
            message : 'success'
        })
    },
    postListing :  async function(req,res,next){
        //Remember to Validate this post in helopers class
        
        var user = await User.findById(req.user.user);
        if(!user){
            return res.status(204).json({
                data : {},
                message : 'No User Content'
            })
        }
        try{
            let post = new Post({
                Description : req.body.description,
                AccomodationType : req.body.accomodationtype,
                School : req.body.school,
                Host : user._id,
                Price : req.body.price,
                Status : 'Not Taken'
            });
            let savedPost = await post.save();
            if(savedPost){
                return res.status(201).json({
                    data : savedPost,
                    message : 'success',
                    status : res.status
    
                })
            }
            

        }catch{
            return res.status(500).json({
                data : {},
                message : 'Internal Server Error'
            })
        }


    },
    getAListing : async function(){
        let postId = req.params.id;
        try{
            let post = await Post.findOne({_id : postId});
            res.status(200).json({
                data : post,
            })
        }catch{
            req.status(500).json({
                data : {},
                message : 'Internal Server Error'
            })
        }
    }
   
}
const User = require('../../Models/User')
const Model = require('../../Models/Models');
const Post =  Model.Post;
const Transaction = Model.Transaction;
const Image = Model.Image;
const Bid = Model.Bid;


//Still Getting the flow of this route

module.exports = {
    orderListing : async function(){

        var user = await User.findById(req.user.user);
        var post = await Post.findById(req.params.id);

        if(!user){
            return res.status(204).json({
                data : {},
                message : 'No User Content'
            })
        }
        try{
          let bid = new Bid({
              
          })
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
                status: 500,
                message : 'Internal Server Error'
            })
        }

    }
}
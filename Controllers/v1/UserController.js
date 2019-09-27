module.exports = {
    index : function(req,res,next){


        return res.json({
            data : req.user,
            status : 200,
            message : 'Inside UserController'
        })
    }
}
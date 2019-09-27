const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({
            data : {},
            message:'Access Denied'
        })
    }
    try{
        jwt.verify(token,process.env.JWT_KEY,function(err,data){

            if(err){
                res.status(401).json({
                    data : {},
                    message : err.message
                })
            }

            if(!data){
                res.status(204).json({
                    data : {},
                    message : 'No Content'
                })
            }

            req.user = data;
            next();

        });
        

    }catch(error){
        res.status(403).json({
            data:{},
            message : 'Access Denied',
        })
    }


    //Verifying the web Token
}
//const validate = require('../../helpers/validate');
const User = require('../../Models/User');
const token = require('../../helpers/generateToken')

module.exports = {


    Register: async function(req,res,next){
        
        var registerUser = {

            UserName : req.body.username,
            Email : req.body.email,
            Password : req.body.password,
            PhoneNumber : req.body.phonenumber
        }
        // if(!validate.registerValidation(registerUser)){
        //     return res.json({
        //         data :  {},
        //         status : 400,
        //         message : 'error'
        //     })
        // }
        let userNameExist = await User.findOne({UserName: registerUser.UserName});
        let userEmailExist = await User.findOne({Email : registerUser.Email})
        if(userNameExist || userEmailExist){
           if(userNameExist){
            return res.status(400).json({
                data : {},
                message : 'UserName Already Exist'
            })
           }else if(userEmailExist){
            return res.status(400).json({
                data : {},
                message : 'User Email Already Exist'
            })
           }
        }
       
        try{
            const user = new User({
                UserName : registerUser.UserName,
                Email : registerUser.Email,
                Password : registerUser.Password,
                PhoneNumber : registerUser.PhoneNumber
            })
            const savedUser = await user.save();
            return res.status(201).json({
                data : savedUser,
                message : 'User Created Succesfully'
            })
        }catch(error){
            console.log(error)
            return res.status(500).json({
                data : {},
                message : 'internal Server Error'
            })

        }

     
        

        

    },


    Login: async function(req,res,next){

        //First Validate the user input to see if it passes anything

      var userEmail = req.body.email;
      var userPassword = req.body.password;
     

      try{
        let validatedUser = await User.findByCredentials(userEmail,userPassword);
        
        if(validatedUser){
            //generate Tokens Here
            let generateToken =  token(validatedUser);
           
           
            return res.status(200).header('auth-token',generateToken).json({
                data : validatedUser,
                token : generateToken,
                message : 'User Authenticated'
            })
        }
      }catch(error){
          if(error){
             
              return res.status(401).json({
                data : {},
                token : null,
                message : 'Invalid Login'
            })
          }

      }



    }
}


const validate = require('validator');


const registerValidation = function(data){
    if(!validate.isEmail(data.email)){
        
        return false
        
    }
     return true;
}



const loginValidation= function(data){

}


module.exports = {registerValidation,loginValidation}
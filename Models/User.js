const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const timeStamp = require('../helpers/timeStampPlugin');

// const environment = process.env.NODE_ENV;
// const stage = require('./config')[environment];

// schema maps to a collection
const Schema = mongoose.Schema;

const userSchema = new Schema({
  UserName: {
    type: 'String',
    required: true,
    trim: true,
    unique: true
  },
  Email: {
    type: 'String',
    required: true,
    trim: true,
    unique: true,
    lowercase:true,
    validate: (value) => {
        if (!validator.isEmail(value)) {
            throw new Error({error: 'Invalid Email address'})
        }
    }
  },
  Password: {
    type: 'String',
    required: true,
    trim: true
  },
  PhoneNumber:{
    type: Number,
    required: true,
    trim: true,
    minLength: 11,
    maxLength: 11,

  }

  
 
});

userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified || !user.isNew) { // don't rehash if it's an old user
      next();
    } else {
      bcrypt.hash(user.Password, 10, function(err, hash) {
        if (err) {
          console.log('Error hashing password for user', user.UserName);
          next(err);
        } else {
          user.Password = hash;
          next();
        }
      });
    }

  });

//   userSchema.methods.generateAuthToken = async function() {
//     // Generate an auth token for the user
//     const user = this
//     const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
//     user.tokens = user.tokens.concat({token})
//     await user.save()
//     return token
// }


userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({Email : email} )
    
   
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.Password);
    
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }

    return user;
}
    userSchema.plugin(timeStamp);
    const User = mongoose.model('User', userSchema);
   

    module.exports = User;
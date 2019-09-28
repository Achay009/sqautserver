var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timeStamp = require('../helpers/timeStampPlugin');






var postSchema = new Schema({


})


var transactionlogSchema = new Schema({

})


var imagelogSchema = new Schema({
   Image : {
      type : String,
      trim: true
   }

})






postSchema.plugin(timeStamp);
transactionlogSchema.plugin(timeStamp);
imagelogSchema.plugin(timeStamp);

const Post = mongoose.model('Post',postSchema);
const Transaction = mongoose.model('Transaction',transactionlogSchema);
const Imagelog = mongoose.model('ImageLog',imagelogSchema);
module.exports = Post,Transaction,Imagelog;


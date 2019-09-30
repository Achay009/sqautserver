var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timeStamp = require('../helpers/timeStampPlugin');

const LISTTYPE = Object.freeze({
   ROOM: 'Room',
   SHARED_ROOM : 'Shared Room',
   SHARED_APARTMENT : 'Shared Apartment',
})


const STATUS = Object.freeze({
   PENDINIG: 'Pending',
   SUCCESS : 'Success',
   DECLINED : 'Declined',
})




var postSchema = new Schema({
   Description : {
      type : String,
   },
   AccomodationType : {
      type: String,
      enum: Object.values(LISTTYPE) 
   },
   School : {
      type : String
   },
   User : {
      type : Schema.Types.ObjectId,
      ref : 'User'
   },
   Image : {
      type : Schema.Types.ObjectId,
      ref : 'Image'
   },
   Price : {
      type : Number,
      minlength : 4,

   },
  
    



})


var transactionlogSchema = new Schema({
   Host : {
      type : Schema.Types.ObjectId,
      ref : 'User'
   },
   Guest : {
      type : Schema.Types.ObjectId,
      ref : 'User'
   },
   Status : {
      type : String,
      enum : Object.values(STATUS)
   },
   Amount : {
      type : Number,
      minlength : 4
   },
   Post : {
      type : Schema.Types.ObjectId,
      ref : 'Post',
   },
   School : {
      type : String
   }
   
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
const Image = mongoose.model('Image',imagelogSchema);
module.exports = {
   Post : Post,
   Image : Image,
   Transaction : Transaction
}


const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Schema = mongoose.Schema;
const questionSchema = new Schema({
   firstName: { type: String, require: true, trim: true },
   lastName: { type: String, require: true, trim: true },
   email: {
      type: String, require: true, unique: true,
      validator(value) {
         if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
         }
      },
      trim: true, lowercase: true
   },
   password: {
      type: String, require: true, minlength: 7, trim: true,
      validator(value) {
         if (value.toLowerCase.includes('password')) {
            throw new Error("Password cannot contain 'password' ")
         }
      }
   },
   tokens: [{
      token: {
         type: String,
         required: true
      }
   }]
})

questionSchema.methods.generateAuthToken = async function () {
   const user = this
   const token = jwt.sign({ _id: user._id.toString() }, 'thisisnodeapp')
   user.tokens = user.tokens.concat({ token: token })
   await user.save()
   return token
}

questionSchema.statics.findByCredentials = async (email, password) => {
   const user = await User.findOne({ email: email })
   if (!user) {
      throw new Error('Unable to login')
   }
   const isMatch = await bcrypt.compare(password, user.password)
   if (!isMatch) {
      throw new Error('Unable to login')
   }
   console.log(user)
   return user
}

questionSchema.pre('save', async function (next) {
   const user = this

   if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
   }

   next()
})

const User = mongoose.model('User', questionSchema);

module.exports = User
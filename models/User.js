const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");

// User Schema
const UserSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
  },
  email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
  },
  password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
  },
  profilePhoto: {
      type: Object,
      default: {
          url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
          publicId: null,
      }
  },
  bio: {
      type: String,
  },
  isAdmin: {
      type:Boolean,
      default: false,
  },
  isAccountVerified: {
      type:Boolean,
      default: false,
  },
}, {
  timestamps: true,
});

// Generate Auth Token
UserSchema.methods.generateAuthToken = function() {
  return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET_KEY);
}

// User Model
const User = mongoose.model("User", UserSchema);

// Validate Register User
function validateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    username: Joi.string().trim().min(2).max(200).required(),
    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
}

// Validate Login User
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(6).required(),
  });
  return schema.validate(obj);
}

// Validate Change Password
function validateChangePassword(obj) {
  const schema = Joi.object({
    password: Joi.string().trim().min(6).required(),
  });
  return schema.validate(obj);
}

// Validate Update User
function validateUpdateUser(obj) {
  const schema = Joi.object({
      username: Joi.string().trim().min(2).max(100),
      password: Joi.string().trim().min(8),
      bio: Joi.string(),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateLoginUser,
  validateRegisterUser,
  validateUpdateUser,
  validateChangePassword
};
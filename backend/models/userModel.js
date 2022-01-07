const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        maxLength: [30, "Name Cannot Exceed 30 Characters"],
        minLength: [4, "Name Cannot Exceed 4 Characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Product Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        minLength: [6, "Password should be greater than 6 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
};

// COmpare Password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", userSchema);

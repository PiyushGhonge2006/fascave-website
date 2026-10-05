const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");


const adminUserSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: 80,
      },

      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: 120,
      },

      password: {
        type: String,
        required: [
          true,
          "Password is required",
        ],
        minlength: 8,
        select: false,
      },

      role: {
        type: String,
        enum: ["admin", "editor"],
        default: "admin",
      },

      lastLoginAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );


// --------------------------------------------
// HASH PASSWORD BEFORE SAVE
// --------------------------------------------

// Mongoose 7+ does not pass a `next` callback to
// async hooks. Returning the promise is the only
// supported way to signal completion, so this hook
// must NOT accept or call `next`.
adminUserSchema.pre(
  "save",
  async function () {

    if (!this.isModified("password")) {

      return;

    }

    const salt =
      await bcrypt.genSalt(10);

    this.password =
      await bcrypt.hash(
        this.password,
        salt
      );

  }
);


// --------------------------------------------
// COMPARE PLAIN TEXT PASSWORD
// --------------------------------------------

adminUserSchema.methods.matchPassword =
  async function (
    enteredPassword
  ) {

    return bcrypt.compare(
      enteredPassword,
      this.password
    );

  };


// --------------------------------------------
// PUBLIC SHAPE
// --------------------------------------------

adminUserSchema.methods.toPublicJSON =
  function () {

    return {
      id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      lastLoginAt: this.lastLoginAt,
    };

  };


const AdminUser = mongoose.model(
  "AdminUser",
  adminUserSchema
);

module.exports = AdminUser;

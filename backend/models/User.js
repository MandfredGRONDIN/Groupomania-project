const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
   {
      pseudo: {
         type: String,
         required: true,
         unique: true,
         minLength: 3,
         maxLength: 55,
         trim: true,
      },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      picture: { type: String, default: "" },
      tokens: [{ type: Object }],
   },
   {
      timestamps: true,
      isadmin: { type: Boolean },
   }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

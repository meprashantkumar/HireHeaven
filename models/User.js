import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["jobseeker", "recruiter"],
      requiered: true,
    },
    bio: {
      type: String,
    },
    skills: [
      {
        type: String,
      },
    ],
    resume: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    savedJobs: [
      {
        type: String,
        required: true,
      },
    ],
    resetPasswordExpire: Date,
    resetToken: String,
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

export const User = mongoose.model("User", schema);

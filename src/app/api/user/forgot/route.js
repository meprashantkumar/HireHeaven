import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import { User } from "../../../../../models/User";
import jwt from "jsonwebtoken";
import sendMail from "../../../../../middlewares/sendMail";

export async function POST(req) {
  try {
    connectDb();

    const body = await req.json();

    const { email } = body;

    const user = await User.findOne({ email });

    if (!user)
      return NextResponse.json(
        {
          message: "No user with this email",
        },
        {
          status: 400,
        }
      );

    const token = jwt.sign({ email }, process.env.Forgot_sec);

    const data = { email, token };

    await sendMail("HireHeaven", data);

    user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
    user.resetToken = token;

    await user.save();

    return NextResponse.json({
      message: "Reset Password Link is send to your mail",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

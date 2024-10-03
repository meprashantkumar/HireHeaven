import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "../../../../../models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    connectDb();

    const { searchParams } = new URL(req.url);

    const token = searchParams.get("token");

    const decodedData = jwt.verify(token, process.env.Forgot_sec);

    const user = await User.findOne({ email: decodedData.email });

    if (user.resetToken !== token)
      return NextResponse.json(
        {
          message: "Invalid Token",
        },
        {
          status: 400,
        }
      );

    if (user.resetPasswordExpire === null)
      return NextResponse.json(
        {
          message: "Token Expired",
        },
        {
          status: 400,
        }
      );

    if (user.resetPasswordExpire < Date.now()) {
      return NextResponse.json(
        {
          message: "Token Expired",
        },
        {
          status: 400,
        }
      );
    }

    const body = await req.json();

    const { password } = body;

    const hash = await bcrypt.hash(password, 10);

    user.password = hash;

    user.resetPasswordExpire = null;
    user.resetToken = null;
    await user.save();

    return NextResponse.json({
      message: "Password Changed Successfully",
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

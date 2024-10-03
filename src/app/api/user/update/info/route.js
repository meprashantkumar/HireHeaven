import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import CheckAuth from "../../../../../../middlewares/isAuth";
import { User } from "../../../../../../models/User";

export async function POST(req) {
  try {
    connectDb();

    const { searchParams } = new URL(req.url);

    const token = searchParams.get("token");

    const user = await CheckAuth(token);

    if (!user)
      return NextResponse.json(
        {
          message: "Please Login",
        },
        {
          status: 400,
        }
      );

    const loggedInUser = await User.findById(user._id);

    const body = await req.json();

    const { name, phoneNumber, bio } = body;

    loggedInUser.name = name;
    loggedInUser.phoneNumber = phoneNumber;
    loggedInUser.bio = bio;

    await loggedInUser.save();

    return NextResponse.json({
      message: "Profile Updated",
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

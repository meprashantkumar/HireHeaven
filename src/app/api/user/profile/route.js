import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import { User } from "../../../../../models/User";
import CheckAuth from "../../../../../middlewares/isAuth";

export async function GET(req) {
  try {
    await connectDb();

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

    if (user.role !== "recruiter")
      return NextResponse.json(
        {
          message: "You are not recruiter",
        },
        {
          status: 400,
        }
      );

    const id = searchParams.get("id");

    const userProfile = await User.findById(id);

    return NextResponse.json(userProfile);
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

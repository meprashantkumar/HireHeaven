import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import CheckAuth from "../../../../../../middlewares/isAuth";
import { User } from "../../../../../../models/User";

export async function DELETE(req) {
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

    const skill = searchParams.get("skill");

    const index = loggedInUser.skills.indexOf(skill);

    loggedInUser.skills.splice(index, 1);

    await loggedInUser.save();

    return NextResponse.json({
      message: "Skill Removed",
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

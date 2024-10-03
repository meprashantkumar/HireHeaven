import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import CheckAuth from "../../../../../middlewares/isAuth";
import { Job } from "../../../../../models/Job";
import { User } from "../../../../../models/User";

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

    const id = searchParams.get("id");
    const job = await Job.findById(id);

    if (!job)
      return NextResponse.json(
        {
          message: "No Job with this id",
        },
        {
          status: 404,
        }
      );

    const loggedInUser = await User.findById(user._id);

    if (loggedInUser.savedJobs.includes(job._id)) {
      const index = loggedInUser.savedJobs.indexOf(id);

      loggedInUser.savedJobs.splice(index, 1);

      await loggedInUser.save();

      return NextResponse.json({
        message: "Job Unsaved",
      });
    }

    loggedInUser.savedJobs.push(id);

    await loggedInUser.save();

    return NextResponse.json({
      message: "Job Saved",
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

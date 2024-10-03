import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import CheckAuth from "../../../../../middlewares/isAuth";
import { Job } from "../../../../../models/Job";
import { Application } from "../../../../../models/Application";

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

    const id = searchParams.get("id");
    const job = await Job.findById(id);

    if (!job)
      return NextResponse.json(
        {
          message: "No job with this id",
        },
        {
          status: 400,
        }
      );

    if (job.recruiter.toString() !== user._id.toString())
      return NextResponse.json(
        {
          message: "You are not recruiter of this job",
        },
        {
          status: 400,
        }
      );

    await Application.deleteMany({ job: job._id });

    await job.deleteOne();

    return NextResponse.json({
      message: "Job delete Successfully",
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

import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import CheckAuth from "../../../../../../middlewares/isAuth";
import { Job } from "../../../../../../models/Job";
import { Application } from "../../../../../../models/Application";

export async function PUT(req) {
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

    const application = await Application.findById(id);

    if (!application)
      return NextResponse.json(
        {
          message: "No application with this id",
        },
        {
          status: 400,
        }
      );

    const job = await Job.findById(application.job);

    if (job.recruiter.toString() !== user._id.toString())
      return NextResponse.json(
        {
          message: "You are not recruiter of this job",
        },
        {
          status: 400,
        }
      );

    const body = await req.json();

    const { value } = body;

    application.status = value;

    application.save();
    return NextResponse.json({
      message: "application updated Successfully",
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

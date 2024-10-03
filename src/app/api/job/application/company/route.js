import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import CheckAuth from "../../../../../../middlewares/isAuth";
import { Application } from "../../../../../../models/Application";
import { Job } from "../../../../../../models/Job";

export async function GET(req) {
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
          status: 403,
        }
      );

    if (user.role !== "recruiter")
      return NextResponse.json(
        {
          message: "You are not recruiter",
        },
        {
          status: 403,
        }
      );

    const jobId = searchParams.get("jobId");

    const job = await Job.findById(jobId);

    if (user._id.toString() !== job.recruiter.toString())
      return NextResponse.json(
        {
          message: "You are not recruiter of this company",
        },
        {
          status: 403,
        }
      );

    const applications = await Application.find({
      job: jobId,
    }).populate("applicant");

    return NextResponse.json(applications);
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

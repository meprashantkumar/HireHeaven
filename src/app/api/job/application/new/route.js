import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import CheckAuth from "../../../../../../middlewares/isAuth";
import { Job } from "../../../../../../models/Job";
import { Application } from "../../../../../../models/Application";

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
          status: 403,
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

    if (job.status === "closed")
      return NextResponse.json(
        {
          message: "Status is Closed for this job",
        },
        {
          status: 400,
        }
      );

    let application = await Application.findOne({
      job: id,
      applicant: user._id,
    });

    if (application)
      return NextResponse.json(
        {
          message: "You already applied for this job",
        },
        {
          status: 403,
        }
      );

    application = await Application.create({
      job: id,
      applicant: user._id,
      jobName: job.title,
      jobSalary: job.salary,
    });

    job.applications.push(application._id);

    job.save();

    return NextResponse.json({
      message: "Application Submitted",
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

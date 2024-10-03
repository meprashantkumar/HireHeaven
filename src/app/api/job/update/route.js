import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import CheckAuth from "../../../../../middlewares/isAuth";
import { Company } from "../../../../../models/Company";
import { Job } from "../../../../../models/Job";

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

    const body = await req.json();

    const {
      title,
      description,
      role,
      salary,
      experience,
      location,
      openings,
      status,
    } = body;

    job.title = title;
    job.description = description;
    job.role = role;
    job.salary = salary;
    job.experience = experience;
    job.location = location;
    job.openings = openings;
    job.status = status;

    await job.save();
    return NextResponse.json({
      message: "Job updated Successfully",
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

import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import CheckAuth from "../../../../../middlewares/isAuth";
import { Company } from "../../../../../models/Company";
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

    const company = await Company.findById(id);

    if (company.recruiter.toString() !== user._id.toString())
      return NextResponse.json(
        {
          message: "You are not recruiter of this company",
        },
        {
          status: 400,
        }
      );

    const jobs = await Job.find({ company: company._id });

    jobs.forEach(async (job) => {
      await Application.deleteMany({ job: job._id });
    });

    await Job.deleteMany({ company: company._id });

    await company.deleteOne();

    return NextResponse.json({
      message: "Company Delete",
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

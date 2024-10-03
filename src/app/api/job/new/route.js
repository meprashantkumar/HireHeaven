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

    const body = await req.json();

    const company = searchParams.get("company");

    const companyData = await Company.findById(company);

    if (!companyData)
      return NextResponse.json(
        {
          message: "No Company with this id",
        },
        {
          status: 404,
        }
      );

    const { title, description, role, salary, experience, location, openings } =
      body;

    await Job.create({
      title,
      description,
      role,
      salary,
      experience,
      location,
      openings,
      company: companyData._id,
      comapnyLogo: companyData.logo,
      recruiter: user._id,
    });

    return NextResponse.json({
      message: "Job created Successfully",
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

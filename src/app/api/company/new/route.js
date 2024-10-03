import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import CheckAuth from "../../../../../middlewares/isAuth";
import { Company } from "../../../../../models/Company";
import uploadFile from "../../../../../middlewares/upload";

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

    const companies = await Company.find({ recruiter: user._id });

    if (companies.length === 3)
      return NextResponse.json(
        {
          message: "You have exceeded the limit of maximum company",
        },
        {
          status: 400,
        }
      );

    const formdata = await req.formData();

    const name = formdata.get("name");
    const description = formdata.get("description");
    const location = formdata.get("location");
    const website = formdata.get("website");
    const logo = formdata.get("logo");

    let company = await Company.findOne({ name });

    if (company)
      return NextResponse.json(
        {
          message: "this company already registered",
        },
        {
          status: 400,
        }
      );

    let companyLogo = "";

    if (logo) {
      companyLogo = await uploadFile(logo);
    }

    company = await Company.create({
      name,
      description,
      location,
      logo: companyLogo.url,
      website,
      recruiter: user._id,
    });

    return NextResponse.json(
      {
        message: "company Registered",
      },
      {
        status: 201,
      }
    );
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

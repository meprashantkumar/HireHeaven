import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import { Job } from "../../../../../models/Job";

export async function GET(req) {
  try {
    connectDb();

    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title") || "";
    const location = searchParams.get("location") || "";
    const experience = searchParams.get("experience") || 15;

    const jobs = await Job.find({
      title: {
        $regex: title,
        $options: "i",
      },
      location: {
        $regex: location,
        $options: "i",
      },
      experience: {
        $lte: experience,
      },
    }).sort("-createdAt");

    const topSix = await Job.find().limit(6).sort("-createdAt");

    const locations = await Job.distinct("location");

    return NextResponse.json({ jobs, locations, topSix });
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

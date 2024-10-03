"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { BriefcaseBusiness, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { ApplyForJob } from "@/redux/action/job";

const JobCard = ({ job }) => {
  const { user } = useSelector((state) => state.user);

  const { btnLoading, applications } = useSelector((state) => state.job);

  const dispatch = useDispatch();

  const applyHandler = () => {
    dispatch(ApplyForJob(job._id));
  };

  const [applied, setapplied] = useState(false);

  useEffect(() => {
    if (applications && job._id) {
      applications.forEach((item) => item.job === job._id && setapplied(true));
    }
  }, [applications, job._id]);
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex justify-between items-center gap-3">
          <CardTitle>{job.title}</CardTitle>
          <Link href={`/company/${job.company}`}>
            <img
              src={job.comapnyLogo}
              alt="company"
              className="rounded-full w-16 h-16"
            />
          </Link>
        </div>
        <CardDescription className="flex items-center gap-2">
          {job.experience === 0 ? (
            <>
              <BriefcaseBusiness /> <p>Fresher</p>
            </>
          ) : (
            <>
              <BriefcaseBusiness /> {job.experience} Years
            </>
          )}
        </CardDescription>
        <CardDescription className="flex items-center gap-2">
          <MapPin /> {job.location}
        </CardDescription>
        <CardDescription>₹ {job.salary} P.A</CardDescription>
      </CardHeader>

      <CardContent>{job.description.slice(0, 62)}...</CardContent>

      <CardFooter className="flex justify-between">
        <Link href={`/jobs/${job._id}`}>
          <Button variant="outline">View Detail</Button>
        </Link>

        {user && user.role === "jobseeker" && (
          <>
            {applied ? (
              <p className="text-green-500">Already Applied</p>
            ) : (
              <>
                {job.status === "closed" ? (
                  ""
                ) : (
                  <Button onClick={applyHandler} disabled={btnLoading}>
                    Easy Apply
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;

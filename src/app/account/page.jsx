"use client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Info from "./(component)/Info";
import Loading from "@/components/loading";
import Skill from "./(component)/Skill";
import Company from "./(component)/Company";
import SavedJob from "./(component)/SavedJob";
import AppliedJobs from "./(component)/AppliedJobs";

const Account = () => {
  const { isAuth, user, btnLoading, loading } = useSelector(
    (state) => state.user
  );
  const { jobs, applications } = useSelector((state) => state.job);

  if (!isAuth) return redirect("/login");

  const [savedJobs, setsavedJobs] = useState([]);

  useEffect(() => {
    if (jobs && user && Array.isArray(jobs) && Array.isArray(user.savedJobs)) {
      const savedJobArray = jobs.filter((job) =>
        user.savedJobs.includes(job._id)
      );
      setsavedJobs(savedJobArray);
    }
  }, [jobs, user]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {user && (
            <div className="w-[90%] md:w-[60%] m-auto">
              <Info user={user} btnLoading={btnLoading} />

              {user.role === "jobseeker" && (
                <Skill user={user} btnLoading={btnLoading} />
              )}
              {user.role === "recruiter" && <Company />}

              {user.role === "jobseeker" && <SavedJob savedJobs={savedJobs} />}
              {user.role === "jobseeker" && <AppliedJobs jobs={applications} />}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Account;

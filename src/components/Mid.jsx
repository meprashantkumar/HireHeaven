"use client";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Loading from "./loading";
import JobCard from "./JobCard";

const Mid = () => {
  const { loading, topSix } = useSelector((state) => state.job);
  return (
    <div className="mt-8 w-[80%] m-auto mb-8">
      <div className="top flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-semibold mb-3">
          Latest Jobs on Hire<span className="text-red-500">Heaven</span>
        </h1>

        <Link href={"/jobs"}>
          <Button variant="secondary">
            View All <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex items-center flex-wrap gap-9">
          {topSix && topSix.length > 0 ? (
            topSix.map((e) => {
              return <JobCard key={e._id} job={e} />;
            })
          ) : (
            <p>No Job Yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Mid;

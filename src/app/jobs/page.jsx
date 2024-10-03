"use client";
import JobCard from "@/components/JobCard";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getAllJobs } from "@/redux/action/job";
import { Filter } from "lucide-react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const JobsPage = () => {
  const { loading, jobs, locations } = useSelector((state) => state.job);

  const ref = useRef();

  const clickEvent = () => {
    ref.current.click();
  };

  const dispatch = useDispatch();

  const [title, settitle] = useState("");
  const [location, setlocation] = useState("");
  const [experience, setexperience] = useState("");

  const filterJobs = () => {
    dispatch(getAllJobs(title, location, experience));
    ref.current.click();
  };

  const clearFilter = () => {
    settitle("");
    setlocation("");
    setexperience(15);

    dispatch(getAllJobs());
    ref.current.click();
  };

  const [page, setPage] = useState(1);

  let totalPages;

  if (jobs) {
    totalPages = Math.ceil(jobs.length / 6);
  }

  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };
  return (
    <div>
      <div className="w-[80%] m-auto mt-3">
        <div className="title flex justify-between items-center">
          <h1 className="text-2xl">
            All <span className="text-red-500">Jobs</span>
          </h1>
          <div className="icon">
            <Button variant="secondary" onClick={clickEvent}>
              <Filter size={18} />
            </Button>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex items-center flex-wrap gap-9 md:gap-10 p-2">
            {jobs && jobs.length > 0 ? (
              jobs.slice((page - 1) * 6, page * 6).map((e) => {
                return <JobCard key={e._id} job={e} />;
              })
            ) : (
              <p>No Jobs Yet</p>
            )}
          </div>
        )}
        {jobs && jobs.length > 6 && (
          <div className="mt-2 mb-3">
            <Pagination>
              <PaginationContent>
                {page !== 1 && (
                  <PaginationItem className="cursor-pointer" onClick={prevPage}>
                    <PaginationPrevious />
                  </PaginationItem>
                )}
                {page !== totalPages && (
                  <PaginationItem className="cursor-pointer" onClick={nextPage}>
                    <PaginationNext />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button ref={ref} className="hidden"></Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center gap-1">
              Filters <Filter size={18} />
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Search with title</Label>
              <Input
                type="text"
                className="col-span-3"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </div>

            <select
              value={location}
              onChange={(e) => setlocation(e.target.value)}
              className="w-[350px] border border-gray-300 p-2 rounded-md ml-2"
            >
              <option value={""}>Select Location</option>
              {locations &&
                locations.map((e) => {
                  return <option key={e}>{e}</option>;
                })}
            </select>
            <select
              value={experience}
              onChange={(e) => setexperience(e.target.value)}
              className="w-[350px] border border-gray-300 p-2 rounded-md ml-2"
            >
              <option value={15}>Select Experience</option>
              <option value={0}>Fresher</option>;<option value={1}>1</option>;
              <option value={2}>2</option>;<option value={3}>3</option>;
              <option value={4}>4</option>;<option value={5}>5</option>;
              <option value={6}>6</option>;<option value={7}>7</option>;
            </select>
          </div>

          <DialogFooter>
            <Button onClick={filterJobs}>Apply</Button>
            <Button variant="destructive" onClick={clearFilter}>
              Clear Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobsPage;

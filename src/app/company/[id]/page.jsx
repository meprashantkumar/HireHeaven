"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSingleCompany } from "@/redux/action/company";
import { AddJob, deleteJob } from "@/redux/action/job";
import { DeleteIcon, Earth, Eye, Plus } from "lucide-react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CompanyPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { company, loading } = useSelector((state) => state.company);

  const { user, isAuth } = useSelector((state) => state.user);

  const { jobs, btnLoading } = useSelector((state) => state.job);

  let companyJobs;

  if (jobs) {
    companyJobs = jobs.filter((job) => job.company === id);
  }

  console.log(companyJobs);

  if (!isAuth) return redirect("/login");

  useEffect(() => {
    dispatch(getSingleCompany(id));
  }, [id]);

  const addRef = useRef();

  const clickAdd = () => {
    addRef.current.click();
  };

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [role, setrole] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setexperience] = useState("");
  const [location, setlocation] = useState("");
  const [openings, setOpenings] = useState("");

  const clearInput = () => {
    settitle("");
    setdescription("");
    setrole("");
    setSalary("");
    setexperience("");
    setlocation("");
    setOpenings("");
  };

  const addJobHandler = () => {
    dispatch(
      AddJob(
        id,
        title,
        description,
        role,
        salary,
        experience,
        location,
        openings,
        clearInput
      )
    );
  };

  const deleteHandler = (id) => {
    if (confirm("are you sure you want to delete this job"))
      dispatch(deleteJob(id));
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {company && (
            <>
              <div className="container px-5 pt-14 mx-auto flex flex-wrap flex-col">
                <img
                  src={company.logo}
                  className="xl:w-1/4 lg:w-1/3 md:w-1/2 w-2/3 block mx-auto mb-10 object-cover object-center rounded border border-black"
                  alt=""
                />

                <div className="flex flex-col text-center w-full">
                  <h1 className="text-xl font-medium mb-4">{company.name}</h1>

                  <p className="lg:w=2/3 md:w-1/2 mx-auto leading-relaxed text-base">
                    {company.description}
                  </p>

                  <Link className="mt-4" href={company.website} target="_blank">
                    <Button>
                      Visit our website <Earth />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-2/3 px-5 mt-3 mb-5 mx-auto flex flex-wrap flex-col">
                <div className="flex justify-between items-centerp-3">
                  <h1 className="text-3xl">All Jobs</h1>
                  {user && user._id === company.recruiter && (
                    <Button onClick={clickAdd}>
                      Add <Plus size={18} />
                    </Button>
                  )}
                </div>

                <div className="jobs w-[90%] md:w-full mt-2">
                  <Table>
                    <TableCaption>
                      All the jobs offered by this company
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Openings</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {companyJobs &&
                        companyJobs.map((job) => (
                          <TableRow key={job._id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {job.title}{" "}
                                <Link href={`/jobs/${job._id}`}>
                                  <Eye />
                                </Link>
                              </div>
                            </TableCell>
                            <TableCell>₹ {job.salary}</TableCell>
                            <TableCell>{job.openings} openings</TableCell>
                            <TableCell className="text-green-500 flex items-center justify-center gap-3">
                              {job.status}{" "}
                              {user && user._id === company.recruiter && (
                                <Button
                                  onClick={() => deleteHandler(job._id)}
                                  variant="destructive"
                                  disabled={btnLoading}
                                >
                                  <DeleteIcon size={18} />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="hidden" ref={addRef}></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add a Job</DialogTitle>
                    <DialogDescription>
                      Please add valid job. if it will be fake then we will take
                      action against you.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gpa-4">
                      <Label>Title</Label>
                      <Input
                        type="text"
                        className="col-span-3"
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gpa-4">
                      <Label>Description</Label>
                      <Input
                        type="text"
                        className="col-span-3"
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gpa-4">
                      <Label>Role</Label>
                      <Input
                        type="text"
                        className="col-span-3"
                        value={role}
                        onChange={(e) => setrole(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gpa-4">
                      <Label>Salary</Label>
                      <Input
                        type="number"
                        className="col-span-3"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gpa-4">
                      <Label>Experience</Label>
                      <Input
                        type="number"
                        className="col-span-3"
                        value={experience}
                        onChange={(e) => setexperience(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gpa-4">
                      <Label>Location</Label>
                      <Input
                        type="text"
                        className="col-span-3"
                        value={location}
                        onChange={(e) => setlocation(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gpa-4">
                      <Label>Openings</Label>
                      <Input
                        type="number"
                        className="col-span-3"
                        value={openings}
                        onChange={(e) => setOpenings(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button disabled={btnLoading} onClick={addJobHandler}>
                      Add
                      <Plus size={18} />
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyPage;

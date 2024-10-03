"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  ApplyForJob,
  applicationofjob,
  getsingleJobs,
  saveJob,
  updateJob,
  updateStatus,
} from "@/redux/action/job";
import { BriefcaseBusiness, Eye, MapPin, Save, SaveOff } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Link from "next/link";

const JobPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getsingleJobs(id));
  }, [id]);

  const { job, loading, btnLoading, applications, applicationOfJob } =
    useSelector((state) => state.job);
  const { user, isAuth } = useSelector((state) => state.user);

  if (!isAuth) return redirect("/login");

  const [saved, setsaved] = useState(false);

  let savedJobs;

  if (user) savedJobs = user.savedJobs;

  useEffect(() => {
    if (savedJobs && savedJobs.includes(id)) {
      setsaved(true);
    }
  }, [user]);

  const saveJobHander = () => {
    setsaved(!saved);
    dispatch(saveJob(id));
  };

  const applyHandler = () => {
    dispatch(ApplyForJob(id));
  };

  const [applied, setapplied] = useState(false);

  useEffect(() => {
    if (applications && id) {
      applications.forEach((item) => item.job === id && setapplied(true));
    }
  }, [applications, id]);

  const updateRef = useRef();

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [role, setrole] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setexperience] = useState("");
  const [location, setlocation] = useState("");
  const [openings, setOpenings] = useState("");
  const [status, setStatus] = useState("");

  const clickUpdate = () => {
    updateRef.current.click();
    settitle(job.title);
    setdescription(job.description);
    setrole(job.role);
    setSalary(job.salary);
    setexperience(job.experience);
    setlocation(job.location);
    setOpenings(job.openings);
    setStatus(job.status);
  };

  const updateJobHandler = () => {
    dispatch(
      updateJob(
        id,
        title,
        description,
        role,
        salary,
        experience,
        location,
        openings,
        status,
        clickUpdate
      )
    );
  };

  useEffect(() => {
    if (user && user.role === "recruiter") dispatch(applicationofjob(id));
  }, [id, job]);

  const [value, setvalue] = useState("");

  const updateApplicationHandler = (Appid) => {
    if (value === "") return alert("please give detail");

    dispatch(updateStatus(Appid, id, value, setvalue));
  };
  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : (
        <>
          {job && (
            <div className="w-[90%] md:w-2/3 container mx-auto flex px-5 py-24 md:flex-row flex-col">
              <div className=" m-auto mb-10 md:mb-0">
                <h1 className="sm:text-4xl text-3xl mb-4 font-medium">
                  {job.title}
                </h1>
                <p className="flex items-center gap-2">
                  <MapPin /> {job.location}
                </p>
                <p className="flex items-center mt-2 gap-2">
                  <BriefcaseBusiness />{" "}
                  {job.experience === 0 ? "Fresher" : job.experience + " Years"}
                </p>
                <p className="flex items-center mt-2 gap-2">
                  Salary - ₹{job.salary} P.A
                </p>
                <p className="flex items-center mt-2 gap-2">
                  Openings - {job.openings}
                </p>
              </div>

              <div className="lg:flex-grow lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                {user && job && user._id === job.recruiter && (
                  <Button onClick={clickUpdate}>Update Job</Button>
                )}
                <p>
                  Status -{" "}
                  {job.status === "open" ? (
                    <span className="text-green-400">Open</span>
                  ) : (
                    <span className="text-red-500">Closed</span>
                  )}
                </p>

                <p className="mb-8 leading-relaxed">{job.description}</p>
                {user && user.role === "jobseeker" && (
                  <div className="flex justify-center items-center gap-2">
                    <Button disabled={btnLoading} onClick={saveJobHander}>
                      {saved ? (
                        <p className="flex justify-center gap-2">
                          Unsave <SaveOff size={18} />
                        </p>
                      ) : (
                        <p className="flex justify-center gap-2">
                          Save <Save size={18} />
                        </p>
                      )}
                    </Button>
                  </div>
                )}
                {user && user.role === "jobseeker" && (
                  <>
                    {applied ? (
                      <p className="text-green-500 mt-3">Already Applied</p>
                    ) : (
                      <>
                        {job.status === "closed" ? (
                          ""
                        ) : (
                          <Button
                            className="mt-3"
                            onClick={applyHandler}
                            disabled={btnLoading}
                          >
                            Easy Apply
                          </Button>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {user && job && user._id === job.recruiter && (
            <div className="jobs  mt-2 w-[90%] md:w-2/3 container mx-auto">
              <h1>All Applications</h1>
              <Table>
                <TableCaption>all applications</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Profile</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {applicationOfJob &&
                    applicationOfJob.map((e) => (
                      <TableRow key={e._id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {e.applicant.name}
                            <select
                              value={value}
                              onChange={(e) => setvalue(e.target.value)}
                              className="p-2 border border-gray-400"
                            >
                              <option value={""}>update status</option>
                              <option value={"accepted"}>Accepted</option>
                              <option value={"rejected"}>Rejected</option>
                            </select>
                            <Button
                              disabled={btnLoading}
                              onClick={() => updateApplicationHandler(e._id)}
                            >
                              Update
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link target="_blank" href={e.applicant.resume}>
                            Resume
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/account/${e.applicant._id}`}>
                            Profile
                          </Link>
                        </TableCell>
                        <TableCell>
                          {e.status === "pending" && (
                            <p className="text-yellow-500">{e.status}</p>
                          )}
                          {e.status === "accepted" && (
                            <p className="text-green-500">{e.status}</p>
                          )}
                          {e.status === "rejected" && (
                            <p className="text-red-500">{e.status}</p>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}

      {/* Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hidden" ref={updateRef}></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Job</DialogTitle>
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
            <div className="grid grid-cols-4 items-center gpa-4">
              <Label>Status</Label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={"open"}>Open</option>
                <option value={"closed"}>Closed</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button disabled={btnLoading} onClick={updateJobHandler}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobPage;

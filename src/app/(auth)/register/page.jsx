"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/redux/action/user";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [bio, setbio] = useState("");
  const [resume, setresume] = useState("");
  const [profilePic, setprofilePic] = useState("");

  const { isAuth, btnLoading } = useSelector((state) => state.user);

  if (isAuth) return redirect("/");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("role", role);
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("phoneNumber", phoneNumber);
    formdata.append("profilePic", profilePic);

    {
      role === "jobseeker" && formdata.append("bio", bio);
    }
    {
      role === "jobseeker" && formdata.append("resume", resume);
    }

    dispatch(registerUser(formdata));
  };

  return (
    <div className="mt-20 md:mt-5 z-0">
      <div className="md:w-1/3 border border-gray-400 rounded-lg p-8 flex flex-col w-full relative shadow-md m-auto">
        <h2 className="mb-1">
          <span className="text-3xl">Register to </span>
          <span className="text-3xl">Hire</span>
          <span className="text-3xl text-red-500">Heven</span>
        </h2>
        <form
          onSubmit={submitHandler}
          className="flex flex-col justify-between mt-3"
        >
          <div className="grid w-full max-w-sm items-center gap-1.5 ml-1">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border-2 border-gray-300 rounded"
              required
            >
              <option value="">Select Role</option>
              <option value="jobseeker">JobSeeker</option>
              <option value="recruiter">Recruiter</option>
            </select>
            {role && (
              <>
                <Label>Name</Label>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
                <Label>PhoneNumber</Label>
                <Input
                  type="number"
                  placeholder="PhoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setphoneNumber(e.target.value)}
                  required
                />
                <Label>ProfilePic</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setprofilePic(e.target.files[0])}
                  required
                />
                {role === "jobseeker" && (
                  <>
                    <Label>Resume</Label>
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setresume(e.target.files[0])}
                    />
                    <Label>Bio</Label>
                    <Input
                      type="text"
                      placeholder="Enter Bio"
                      value={bio}
                      onChange={(e) => setbio(e.target.value)}
                    />
                  </>
                )}
                <Button
                  disabled={btnLoading}
                  className="flex justify-center items-center gap-2"
                >
                  Submit <ArrowRight size={18} />
                </Button>
              </>
            )}
          </div>
        </form>
        <Link
          className="mt-2 text-blue-500 underline text-xs ml-2"
          href={"/login"}
        >
          have an account?
        </Link>
      </div>
    </div>
  );
};

export default Register;

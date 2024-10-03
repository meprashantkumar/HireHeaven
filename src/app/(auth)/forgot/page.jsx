"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/redux/action/user";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Forgot = () => {
  const [email, setemail] = useState("");

  const { isAuth, btnLoading } = useSelector((state) => state.user);

  if (isAuth) return redirect("/");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email, setemail));
  };
  return (
    <div className="mt-20 md:mt-5 z-0">
      <div className="md:w-1/3 border border-gray-400 rounded-lg p-8 flex flex-col w-full relative shadow-md m-auto">
        <h2 className="mb-1">
          <span className="text-3xl">Forgot Password </span>
        </h2>
        <form
          onSubmit={submitHandler}
          className="flex flex-col justify-between mt-3"
        >
          <div className="grid w-full max-w-sm items-center gap-1.5 ml-1">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />

            <Button
              disabled={btnLoading}
              className="flex justify-center items-center gap-2"
            >
              Submit <ArrowRight size={18} />
            </Button>
          </div>
        </form>
        <Link
          className="mt-2 text-blue-500 underline text-sm ml-2"
          href={"/login"}
        >
          go to login page
        </Link>
      </div>
    </div>
  );
};

export default Forgot;

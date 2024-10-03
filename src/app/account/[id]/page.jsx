"use client";
import Loading from "@/components/loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getUserProfile } from "@/redux/action/user";
import { Mail, NotepadText, Phone } from "lucide-react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    userProfile: user,
    loading,
    isAuth,
  } = useSelector((state) => state.user);

  if (!isAuth) return redirect("/login");

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [id]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-[90%] md:w-[60%] m-auto">
          {user && (
            <>
              <Card className="w-full shadow-sm mt-3 py-3 md:px-10 flex gap-8 flex-wrap">
                <div className="left">
                  <div className="image flex items-center">
                    <img
                      src={user.profilePic}
                      alt=""
                      className="w-[200px] h-[200px] rounded-full"
                    />
                  </div>
                </div>

                <div className="right">
                  <div className="name flex items-center gap-4">
                    <p className="text-2xl">{user.name}</p>
                  </div>
                  <br />
                  {user.role === "jobseeker" && <p>Bio:{user.bio}</p>}
                  <br />
                  <h2 className="text-xl text-blue-600">Contact Info</h2>
                  <div className="contact flex items-center gap-4 flex-wrap">
                    <p className="text-xl flex items-center gap-2">
                      <Mail /> {user.email}
                    </p>
                    <p className="text-xl flex items-center gap-2">
                      <Phone /> {user.phoneNumber}
                    </p>
                  </div>

                  {user.role === "jobseeker" && (
                    <div className="resume mt-5">
                      <p className="flex items-center gap-2">
                        Resume -{" "}
                        <Link
                          href={user.resume}
                          className="flex items-center text-blue-500 underline"
                          target="_blank"
                        >
                          <NotepadText /> Resume
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="w-full shadow-sm mt-3 py-3 md:px-10 px-3">
                <div className="flex gap-8 flex-wrap items-center">
                  <CardTitle>Skills</CardTitle>
                </div>

                <CardContent className="mt-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    {user.skills && user.skills.length > 0 ? (
                      user.skills.map((e) => {
                        return (
                          <p
                            key={e}
                            className="p-3 border border-gray-400 rounded-lg flex justify-center items-center gap-2"
                          >
                            {e}
                          </p>
                        );
                      })
                    ) : (
                      <CardDescription>No Skills Yet.</CardDescription>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default page;

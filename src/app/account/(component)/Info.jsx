"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { updatePhoto, updateProfile, updateResume } from "@/redux/action/user";
import { Edit, Mail, NotepadText, Phone } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

const Info = ({ user, btnLoading }) => {
  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.click();
  };

  const [name, setname] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [bio, setbio] = useState("");

  const editRef = useRef();

  const handleEditClick = () => {
    editRef.current.click();
    setname(user.name);
    setphoneNumber(user.phoneNumber);
    setbio(user.bio);
  };

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formdata = new FormData();
      formdata.append("profilePic", file);

      dispatch(updatePhoto(formdata));
    }
  };

  const updateProfileHandler = () => {
    dispatch(updateProfile(name, phoneNumber, bio));
  };

  const resumeRef = useRef();

  const resumeClick = () => {
    resumeRef.current.click();
  };

  const changeResume = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        alert("Please upload Pdf file");
        return;
      }

      const formdata = new FormData();
      formdata.append("resume", file);
      dispatch(updateResume(formdata));
    }
  };
  return (
    <div>
      <Card className="w-full shadow-sm mt-3 py-3 md:px-10 flex gap-8 flex-wrap">
        <div className="left">
          <div className="image flex items-center">
            <img
              src={user.profilePic}
              alt=""
              className="w-[200px] h-[200px] rounded-full"
            />
            <Button variant="link" onClick={handleClick}>
              <Edit size={18} />
            </Button>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              ref={inputRef}
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="right">
          <div className="name flex items-center gap-4">
            <p className="text-2xl">{user.name}</p>
            <Button variant="link" onClick={handleEditClick}>
              <Edit size={18} />
            </Button>
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
                <Button variant="link" onClick={resumeClick}>
                  <Edit size={18} />
                </Button>
                <input
                  type="file"
                  ref={resumeRef}
                  className="hidden"
                  accept="application/pdf"
                  onChange={changeResume}
                />
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button ref={editRef} variant="outline" className="hidden">
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                className="col-span-3"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                PhoneNumber
              </Label>
              <Input
                id="phone"
                type="number"
                className="col-span-3"
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                type="text"
                className="col-span-3"
                value={bio}
                onChange={(e) => setbio(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={btnLoading}
              onClick={updateProfileHandler}
              type="submit"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Info;

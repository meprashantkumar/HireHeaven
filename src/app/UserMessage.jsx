"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { clearError, clearMessage } from "@/redux/reducer/userReducer";
import { Toaster } from "@/components/ui/toaster";
import { getUser } from "@/redux/action/user";
import { getAllCompany } from "@/redux/action/company";
import { getAllApplications, getAllJobs } from "@/redux/action/job";

const UserMessage = () => {
  const { error, message } = useSelector((state) => state.user);

  const { toast } = useToast();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Someting went wrong.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        description: error,
      });

      dispatch(clearError());
    }

    if (message) {
      toast({
        variant: "success",
        description: message,
      });

      dispatch(clearMessage());
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllCompany());
    dispatch(getAllJobs());
    dispatch(getAllApplications());
  }, []);
  return (
    <div>
      <Toaster />
    </div>
  );
};

export default UserMessage;

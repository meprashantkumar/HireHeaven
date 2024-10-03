"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { clearError, clearMessage } from "@/redux/reducer/jobReducer";

const JobMessage = () => {
  const { error, message } = useSelector((state) => state.job);

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
  return <div></div>;
};

export default JobMessage;

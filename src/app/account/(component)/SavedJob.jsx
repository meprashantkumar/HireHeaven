import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

const SavedJob = ({ savedJobs }) => {
  return (
    <div className="container px-5 mt-3 mb-5 mx-auto flex flex-wrap flex-col">
      <div className="flex justify-between items-center p-3">
        <h1 className="text-3xl">All Jobs You have saved</h1>
      </div>

      <div className="jobs w-[90%] md:w-full">
        <Table>
          <TableCaption>All The Jobs you have saved</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>title</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {savedJobs &&
              savedJobs.map((e) => {
                return (
                  <TableRow key={e._id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {e.title}{" "}
                        <Link href={`/jobs/${e._id}`}>
                          <Eye />
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell>₹{e.salary}</TableCell>
                    <TableCell>{e.status}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SavedJob;

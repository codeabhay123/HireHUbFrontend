import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs, allJobs } = useSelector((store) => store.job);
  const [filteredAppliedJobs, setFilteredAppliedJobs] = useState([]);

  useEffect(() => {
    if (!allAppliedJobs || allAppliedJobs.length === 0) {
      setFilteredAppliedJobs([]);
      return;
    }

    // Filter applied jobs: only keep those with a valid job object AND job exists in allJobs
    const validAppliedJobs = allAppliedJobs.filter(
      (appliedJob) =>
        appliedJob.job && allJobs.some((job) => job._id === appliedJob.job._id)
    );

    setFilteredAppliedJobs(validAppliedJobs);
  }, [allAppliedJobs, allJobs]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(!filteredAppliedJobs || filteredAppliedJobs.length === 0) ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                You haven't applied to any job yet.
              </TableCell>
            </TableRow>
          ) : (
            filteredAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob.job?.title || "Job Deleted"}</TableCell>
                <TableCell>{appliedJob.job?.company?.name || "-"}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={
                      appliedJob?.status === "rejected"
                        ? "bg-red-600 text-white"
                        : appliedJob?.status === "pending"
                        ? "bg-gray-600 text-white"
                        : "bg-green-700 text-white"
                    }
                  >
                    {appliedJob?.status?.toUpperCase() || "PENDING"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;

import "./jobs-grid.scss";
import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { IJob } from "../../types/global.typing";
import Button from "@mui/material/Button/Button";

//Grid for tasks

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "title", headerName: "Title", width: 200 },
  { field: "content", headerName: "Content", width: 300 },
  { field: "status", headerName: "Status", width: 150 },
  { field: "activityName", headerName: "Activity Name", width: 150 },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 150,
    renderCell: (params) => moment(params.row.startDate).format("DD-MM-YYYY"),
  },
  {
    field: "endDate",
    headerName: "End Date",
    width: 150,
    renderCell: (params) => moment(params.row.endDate).format("DD-MM-YYYY"),
  },
  {
    field: "createdAt",
    headerName: "Creation Time",
    width: 200,
    renderCell: (params) => moment(params.row.createdAt).fromNow(),
  },
  {
    field: "delete",
    headerName: "",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => <Button className="delete-button">Delete</Button>,
  },
  {
    field: "edit",
    headerName: "",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => <Button className="edit-button">Edit</Button>,
  },
];

interface IJobsGridProps {
  data: IJob[];
}

const JobsGrid = ({ data }: IJobsGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="jobs-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default JobsGrid;

import "./activities-grid.scss";
import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { IActivity } from "../../types/global.typing";
import Button from "@mui/material/Button/Button";
import DeleteJob from "../jobs/DeleteJob";

//Grid for Activities

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "status", headerName: "Status", width: 150 },
  {
    field: "createdAt",
    headerName: "Creation Time",
    width: 200,
    renderCell: (params) => moment(params.row.createdAt).format("DD-MM-YYYY"),
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
    renderCell: ({ row }) => <Button className="edit-button" onClick={DeleteJob}>Edit</Button>,
  }
];

interface IActivitiesGridProps {
  data: IActivity[];
}

const ActivitiesGrid = ({ data }: IActivitiesGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="activities-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default ActivitiesGrid;

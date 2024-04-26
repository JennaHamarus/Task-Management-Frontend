import { useState } from "react";
import { ICreateActivityDto } from "../../types/global.typing";
import FormControl from "@mui/material/FormControl/FormControl";
import TextField from "@mui/material/TextField/TextField";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button/Button";
import Select from "@mui/material/Select/Select";
import httpModule from "../../helpers/http.helper";
import "./activities.scss";

const AddActivity = () => {
  const [activity, setActivity] = useState<ICreateActivityDto>({
    name: "",
    status: "",
  });
  const redirect = useNavigate();

  const handleClickSaveBtn = () => {
    if (activity.name === "" || activity.status === "") {
      alert("Fill all fields");
      return;
    }
    httpModule
      .post("/Activity/Create", activity)
      .then((response) => redirect("/activities"))
      .catch((error) => console.log(error));
  };
  const handleClickBackBtn = () => {
    redirect("/activities");
  };

  return (
    <div className="content">
      <div className="add-activity">
        <h2>Add New Activity</h2>
        <TextField
          autoComplete="off"
          label="Activity Name"
          variant="outlined"
          value={activity.name}
          onChange={(e) => setActivity({ ...activity, name: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Activity Status</InputLabel>
          <Select
            value={activity.status}
            label="Activity Size"
            onChange={(e) => setActivity({ ...activity, status: e.target.value })}
          >
            <MenuItem value="Waiting">Waiting</MenuItem>
            <MenuItem value="InProgress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddActivity;

//Jatka videota eteenpäin

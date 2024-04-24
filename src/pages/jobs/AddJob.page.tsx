import { useState, useEffect } from "react";
import { IActivity, ICreateJobDto } from "../../types/global.typing";
import FormControl from "@mui/material/FormControl/FormControl";
import TextField from "@mui/material/TextField/TextField";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button/Button";
import Select from "@mui/material/Select/Select";
import "./jobs.scss";
import httpHelper from "../../helpers/http.helper";

const levelsArray: string[] = [
  "Intern",
  "Junior",
  "MidLevel",
  "Senior",
  "TeamLead",
  "Cto",
  "Architect",
];

const AddJob = () => {
  const [job, setJob] = useState<ICreateJobDto>({
    title: "",
    level: "",
    activityId: "",
  });
  const [activities, setActivity] = useState<IActivity[]>([]);
  const redirect = useNavigate();

  useEffect(() => {
    httpHelper
      .get<IActivity[]>("/Activity/Get")
      .then((response) => {
        setActivity(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (job.title === "" || job.level === "" || job.activityId === "") {
      alert("Fill all fields");
      return;
    }
    httpHelper
      .post("/Job/Create", job)
      .then((response) => redirect("/activities"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/activities");
  };

  return (
    <div className="content">
      <div className="add-job">
        <h2>Add New Job</h2>
        <TextField
          autoComplete="off"
          label="Job Title"
          variant="outlined"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Job Level</InputLabel>
          <Select
            value={job.level}
            label="Job Level"
            onChange={(e) => setJob({ ...job, level: e.target.value })}
          >
            {levelsArray.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Activity</InputLabel>
          <Select
            value={job.activityId}
            label="Activity"
            onChange={(e) => setJob({ ...job, activityId: e.target.value })}
          >
            {activities.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
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

export default AddJob;

//Jatka videota eteenpäin

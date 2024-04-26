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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";

interface DatePickerState {
  startDate: Date | null;
  endDate: Date | null;
}

const statusArray: string[] = ["Waiting", "In Progress", "Done"];

const AddJob: React.FC = () => {
  const [job, setJob] = useState<ICreateJobDto>({
    title: "",
    content: "",
    status: "",
    activityId: "",
    startDate: "",
    endDate: "",
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
    if (
      job.title === "" ||
      job.content === "" ||
      job.status === "" ||
      job.activityId === "" ||
      job.startDate === "" ||
      job.endDate === ""
    ) {
      alert("Fill all fields");
      return;
    }
    httpHelper
      .post("/Job/Create", job)
      .then((response) => redirect("/tasks"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/tasks");
  };

  return (
    <div className="content">
      <div className="add-job">
        <h2>Add New Task</h2>
        <TextField
          autoComplete="off"
          label="Task Title"
          variant="outlined"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
        <TextField
          autoComplete="off"
          label="Task Content"
          variant="outlined"
          value={job.content}
          onChange={(e) => setJob({ ...job, content: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Task Status</InputLabel>
          <Select
            value={job.status}
            label="Task Status"
            onChange={(e) => setJob({ ...job, status: e.target.value })}
          >
            {statusArray.map((item) => (
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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
          <DatePicker label="Start date"/>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
          <DatePicker label="End date" />
        </LocalizationProvider>

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

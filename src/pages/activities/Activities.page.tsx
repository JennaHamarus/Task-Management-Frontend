import { useEffect, useState } from "react";
import "./activities.scss";
import httpHelper from "../../helpers/http.helper";
import { IActivity } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import ActivityGrid from "../../components/activities/ActivitiesGrid.component";

const Activities = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpHelper
      .get<IActivity[]>("/Activity/Get")
      .then((response) => {
        setActivities(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content activities">
      <div className="heading">
        <h2>Activities</h2>
        <Button variant="outlined" onClick={() => redirect("/activities/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : activities.length === 0 ? (
        <h1>No Activities</h1>
      ) : (
        <ActivityGrid data={activities} />
      )}
    </div>
  );
};

export default Activities;
//Frontend ei saa jostain syystä tietoa backendistä. Ongelma ilmeni, kun vaihdoin databasessa Activityn columnin nimen Sizesta Statukseksi

export interface IActivity {
  id: string;
  name: string;
  status: string;
  createdAt: string;
}

export interface ICreateActivityDto {
  name: string;
  status: string;
}

export interface IJob {
  id: string;
  title: string;
  level: string;
  activityId: string;
  activityName: string;
  createdAt: string;
}

export interface ICreateJobDto {
  title: string;
  level: string;
  activityId: string;
}
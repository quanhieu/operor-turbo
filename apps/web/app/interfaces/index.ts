export interface IData<T> {
  docs: T[];
  totalDocs: number;
  page: number;
  limit: number;
  offset: number;
}

export interface IMeeting {
  _id: string;
  start_day: number;
  end_day: number;
}

export interface IDocs {
  _id: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
  days: number;
  meetings: IMeeting[];
  meeting_days: string[];
  total_days_without_meeting: number;
}

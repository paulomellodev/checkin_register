declare namespace Express {
  export interface Response {
    id?: string;
    name?: string;
    code?: string;
    checkin?: {
      id: string;
      date: Date;
      checkin_time: Date[];
      total_hours?: Date | undefined;
    }[];
  }
  export interface Request {
    user: {
      id: string;
    };
  }
}

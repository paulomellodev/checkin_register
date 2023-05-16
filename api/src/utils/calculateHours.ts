import { CheckinHour } from "@prisma/client";

export const calculateWorkingHours = (foundCheckinToday: CheckinHour[]) => {
  let timeDifference = 0;

  for (let i = foundCheckinToday.length; i > 0; i = i - 2) {
    let clockIn: Date = foundCheckinToday[i - 2].time;
    let clockOut: Date = foundCheckinToday[i - 1].time;
    timeDifference += clockOut.getTime() - clockIn.getTime();
  }

  return new Date(timeDifference);
};

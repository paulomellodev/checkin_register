export const calculateWorkingHours = (
  checkin_time: Date[],
  newCheckin: Date
) => {
  let timeDifference = 0;
  let day = newCheckin.toLocaleDateString("pt-BR");

  if (checkin_time.length % 2 === 1) {
    for (let i = checkin_time.length; i > 0; i = i - 2) {
      const clockIn = new Date(day + checkin_time[i - 1]);
      const clockOut = newCheckin;
      timeDifference += clockOut.getTime() - clockIn.getTime();
    }
  }
  return new Date(timeDifference);
};

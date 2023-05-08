export const calculateWorkingHours = (
  foundCheckinToday: any,
  newCheckin: Date
) => {
  let timeDifference = 0;
  let day = newCheckin.toLocaleDateString("pt-BR");

  if (foundCheckinToday.length % 2 === 1) {
    for (let i = foundCheckinToday.length; i > 0; i = i - 2) {
      const clockIn = new Date(foundCheckinToday[i - 1].date);
      const clockOut = newCheckin;
      timeDifference += clockOut.getTime() - clockIn.getTime();
    }
  }
  return new Date(timeDifference);
};

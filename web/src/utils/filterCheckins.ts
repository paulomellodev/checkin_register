import { Checkin } from "../providers/checkin.provider";

export const filterCheckins = (checkins: Checkin[]) => {
  const actualDate = new Date().toLocaleDateString();
  const othersDaysCheckins = [];
  let todayCheckin = {} as Checkin;
  if (checkins.length !== 0) {
    for (let i = 0; checkins.length > i; i++) {
      if (actualDate === checkins[i].date) {
        todayCheckin = checkins[i];
      } else {
        othersDaysCheckins.push(checkins[i]);
      }
    }
  }
  return { todayCheckin, othersDaysCheckins };
};

export const formatTotalHour = (total: string) => {
  const splitted = total.split(":");
  return `${splitted[0]}h ${splitted[1]}m`;
};

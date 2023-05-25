export const formatHour = (date: Date) => {
  return Intl.DateTimeFormat("pt-BR", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    hourCycle: "h24",
  }).format(date);
};

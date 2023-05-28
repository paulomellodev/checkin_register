import { formatTotalHour } from "../../utils/formatTotalHour";

interface CheckinRegisterProps {
  total_hours: string;
  date: string;
}

const Checkins = ({ date, total_hours }: CheckinRegisterProps) => {
  return (
    <div
      className="flex justify-between items-center h-10 w-full rounded p-3
                    bg-gray-250 my-2 text-xs"
    >
      <span className="font-medium ">{date}</span>
      <span className="font-bold">{formatTotalHour(total_hours)}</span>
    </div>
  );
};

export default Checkins;

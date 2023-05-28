import Button from "../../components/Button";
import Checkins from "../../components/CheckinRegister";
import { useCheckinUser } from "../../hooks/checkin.hook";
import { formatTotalHour } from "../../utils/formatTotalHour";

const UserCheckin = () => {
  const { actualCheckin, oldCheckins, loggedUser, registerCheckin } =
    useCheckinUser();

  return (
    <div className="text-gray-150">
      <header className="flex justify-between items-start text-xs">
        <span className="font-bold">Relógio de ponto</span>
        <div className="flex-col text-right">
          <p className="font-bold uppercase">{`#${loggedUser.code.toUpperCase()}`}</p>
          <p className="text-gray-350">{loggedUser.name}</p>
        </div>
      </header>
      <section className="my-3 font-bold">
        <h3 className="text-2xl">
          {actualCheckin.total_hours
            ? formatTotalHour(actualCheckin.total_hours)
            : "0h 00m"}
        </h3>
        <h4 className="text-xs">Horas de hoje</h4>
      </section>
      <Button onClick={() => registerCheckin(loggedUser.id)}>
        {actualCheckin.total_hours
          ? actualCheckin.checkinHour.length % 2 === 0
            ? "Hora da Entrada"
            : "Hora da Saída"
          : "Hora da Entrada"}
      </Button>
      <section className="my-5">
        <h4 className="font-bold text-sm">Dias anteriores</h4>
        {oldCheckins.map((checkin, index) => {
          return (
            <Checkins
              key={index}
              date={checkin.date}
              total_hours={checkin.total_hours}
            />
          );
        })}
      </section>
    </div>
  );
};

export default UserCheckin;

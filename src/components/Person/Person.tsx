import { differenceInDays, parse, startOfToday } from "date-fns";
import { Birthday } from "../../redux/birthdaySlice";
import style from "./Person.module.scss";

const Person = ({ name, surname, date, interests }: Birthday) => {
  const today = startOfToday();
  const daysToBth = differenceInDays(
    parse(date, "yyyy-MM-dd", new Date()),
    today
  );
  return (
    <div className={style.person}>
      <p className={style.name}>{name + " " + surname}</p>
      <p className={style.date}>Birthday date: {date}</p>
      <p className={style.time}>
        Birthday in {daysToBth < 0 ? daysToBth + 365 : daysToBth}{" "}
        {daysToBth > 1 ? "days" : "day"}
      </p>
      <p className={interests}>Interests: {interests}</p>
    </div>
  );
};

export default Person;

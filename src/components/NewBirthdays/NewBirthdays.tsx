import styles from "./NewBirthdays.module.scss";
import { format, parseISO, getDate, getMonth } from "date-fns";
import { useSelector } from "react-redux";
import { Birthday } from "../../redux/birthdaySlice";
import Person from "../Person/Person";

type Props = {
  selectedDay: Date;
};

const NewBirthdays = ({ selectedDay }: Props) => {
  const birthdayDates = useSelector((state: any) => state.addBirthday);

  let selectedDayBirthdays = birthdayDates.filter(
    (daysOfBirth: Birthday) =>
      getDate(parseISO(daysOfBirth.date)) === getDate(selectedDay) &&
      getMonth(parseISO(daysOfBirth.date)) === getMonth(selectedDay)
  );
  return (
    <div className={styles.calendar__birthdays}>
      <ul className={styles.calendar__list}>
        {selectedDayBirthdays.length > 0 ? (
          <div>
            <h2> Selected day {format(selectedDay, "MMMM dd, yyy")} </h2>
            <h2> On this day, the birthdays have</h2>

            {selectedDayBirthdays.map((date: Birthday, index: number) => (
              <li key={index}>
                <Person {...date} />
              </li>
            ))}
          </div>
        ) : (
          <div>
            <h2>
              No birthdays in
              <time dateTime={format(selectedDay, "MMMM dd, yyy")}>
                {" "}
                {format(selectedDay, "MMMM dd, yyy")}
              </time>
            </h2>
          </div>
        )}
      </ul>
    </div>
  );
};

export default NewBirthdays;

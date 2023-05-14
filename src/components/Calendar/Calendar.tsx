import { useState } from "react";
import CalendarMonth from "./CalendarMonth";
import style from "./Calendar.module.scss";
import NewBirthdays from "../NewBirthdays/NewBirthdays";
import { startOfToday } from "date-fns";

const Calendar = () => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const handleChange = (day: Date) => {
    setSelectedDay(day);
  };

  return (
    <div className={style.calendars}>
      <CalendarMonth handleChange={handleChange} />
      <NewBirthdays selectedDay={selectedDay} />
    </div>
  );
};

export default Calendar;

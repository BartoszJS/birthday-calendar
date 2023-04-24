import { useState } from "react";
import CalendarMonth from "./CalendarMonth";
import CalendarWeek from "./CalendarWeek";
import style from "./Calendar.module.scss";
import Navigation from "../Navigation/Navigation";

const Calendar = () => {
  const [mode, setMode] = useState("month");

  return (
    <div className={style.calendars}>
      <div className={style.calendars__buttons}>
        {/* <button
          className={style.calendars__button}
          onClick={() => setMode("week")}
        >
          week
        </button>
        <button
          className={style.calendars__button}
          onClick={() => setMode("month")}
        >
          month
        </button> */}
      </div>

      {mode === "month" ? <CalendarMonth /> : <CalendarWeek />}
    </div>
  );
};

export default Calendar;

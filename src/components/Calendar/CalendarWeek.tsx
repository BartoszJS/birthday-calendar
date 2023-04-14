import { useState } from "react";
import {
  add,
  isEqual,
  eachDayOfInterval,
  format,
  startOfToday,
  parse,
  parseISO,
  getDate,
  getMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import styles from "./Calendar.module.scss";
import { useSelector } from "react-redux";
import { Birthday } from "../../redux/birthdaySlice";
import Person from "../Person/Person";
import Search from "../Home/Search";
import { AiOutlineSearch } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const Calendar = () => {
  let today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentWeek, setCurrentWeek] = useState(format(today, "w-MMM-yyyy"));
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  let firstDayCurrentWeek = parse(currentWeek, "dd-MMM-yyyy", new Date());

  let daysWeek = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentWeek),
    end: endOfWeek(firstDayCurrentWeek),
  });

  const birthdayDates = useSelector((state: any) => state.addBirthday);

  console.log(currentWeek);

  const previousWeek = () => {
    let firstDayNextWeek = add(firstDayCurrentWeek, { weeks: -1 });
    setCurrentWeek(format(firstDayNextWeek, "dd-MMM-yyyy"));
  };

  const nextWeek = () => {
    let firstDayNextWeek = add(firstDayCurrentWeek, { weeks: 1 });
    console.log(firstDayNextWeek);
    setCurrentWeek(format(firstDayNextWeek, "dd-MMM-yyyy"));
  };

  let selectedDayBirthdays = birthdayDates.filter(
    (daysOfBirth: Birthday) =>
      getDate(parseISO(daysOfBirth.date)) === getDate(selectedDay) &&
      getMonth(parseISO(daysOfBirth.date)) === getMonth(selectedDay)
  );

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__container}>
        <div>
          <div className={styles.calendar__months}>
            <div>{format(firstDayCurrentWeek, "w' week of ' yyyy")}</div>

            <div>
              <button
                type='button'
                className={styles.calendar__arrow_button}
                onClick={previousWeek}
              >
                <MdKeyboardArrowLeft />
              </button>
              <button
                type='button'
                className={styles.calendar__arrow_button}
                onClick={nextWeek}
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
            <div className={styles.calendar__search}>
              {isOpenSearch ? (
                <div>
                  <div className={styles.triangle}></div>
                  <RxCross1
                    className={styles.icon}
                    onClick={() => setIsOpenSearch(!isOpenSearch)}
                  />
                </div>
              ) : (
                <div>
                  <AiOutlineSearch
                    className={styles.icon}
                    onClick={() => setIsOpenSearch(!isOpenSearch)}
                  />
                </div>
              )}
              <div className={styles.alert__list}>
                {isOpenSearch && (
                  <Search
                    handleChangeCalendar={(date: string) => {
                      setCurrentWeek(format(new Date(date), "dd-MMM-yyyy"));
                      setSelectedDay(
                        new Date(format(new Date(date), "dd-MMM-yyyy"))
                      );
                      setIsOpenSearch(false);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={styles.calendar__week}>
            <div className={styles.calendar__week__day}>M</div>
            <div className={styles.calendar__week__day}>T</div>
            <div className={styles.calendar__week__day}>W</div>
            <div className={styles.calendar__week__day}>T</div>
            <div className={styles.calendar__week__day}>F</div>
            <div className={styles.calendar__week__day}>S</div>
            <div className={styles.calendar__week__day}>S</div>
          </div>
          <div className={styles.calendar__month}>
            {daysWeek.map((day, index) => (
              <div key={index} className={styles.calendar__month__day}>
                <button
                  type='button'
                  onClick={() => setSelectedDay(day)}
                  className={
                    isEqual(day, selectedDay)
                      ? `${styles.calendar__month__day__button} ${styles.selected}`
                      : styles.calendar__month__day__button
                  }
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                  <div className={styles.calendar__placeholder}>
                    {birthdayDates.some(
                      (date: Birthday) =>
                        getDate(parseISO(date.date)) === getDate(day) &&
                        getMonth(parseISO(date.date)) === getMonth(day)
                    ) && (
                      <div className={styles.calendar__placeholder__dot}></div>
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.calendar__birthdays}>
          <ul className={styles.calendar__list}>
            {selectedDayBirthdays.length > 0 ? (
              selectedDayBirthdays.map((date: Birthday, index: number) => (
                <li key={index}>
                  <h2> On this day, the birthdays are</h2>
                  <Person {...date} />
                </li>
              ))
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
      </div>
    </div>
  );
};

export default Calendar;

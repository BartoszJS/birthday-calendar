import { useState } from "react";
import {
  add,
  isEqual,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfToday,
  parse,
  getDay,
  parseISO,
  getDate,
  getMonth,
} from "date-fns";
import { motion } from "framer-motion";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import styles from "./Calendar.module.scss";
import { useSelector } from "react-redux";
import { Birthday } from "../../redux/birthdaySlice";
import Person from "../Person/Person";
import Modal from "../Modal/Modal";
import Search from "../Home/Search";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";

const Calendar = () => {
  const today = startOfToday();
  const colStartClasses = [0, 1, 2, 3, 4, 5, 6];
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [showModal, setShowModal] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const birthdayDates = useSelector((state: any) => state.addBirthday);

  const previousMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
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
            <div>{format(firstDayCurrentMonth, "MMMM yyyy")}</div>
            <div>
              <button
                type='button'
                className={styles.calendar__arrow_button}
                onClick={previousMonth}
              >
                <MdKeyboardArrowLeft />
              </button>

              <button
                type='button'
                className={styles.calendar__arrow_button}
                onClick={nextMonth}
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
                      setCurrentMonth(format(new Date(date), "MMM-yyyy"));
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
            {days.map((day, index) => (
              <motion.div
                key={index}
                className={styles.calendar__month__day}
                whileHover={{ scale: 1.1 }}
                style={{
                  gridColumnStart:
                    index === 0 ? colStartClasses[getDay(day)] : "",
                }}
              >
                <button
                  type='button'
                  onClick={() => {
                    setSelectedDay(day);
                    setShowModal(true);
                  }}
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
              </motion.div>
            ))}
          </div>
        </div>
        <div className={styles.calendar__birthdays}>
          <ul className={styles.calendar__list}>
            {selectedDayBirthdays.length > 0 ? (
              <div>
                <h2> Selected day {format(selectedDay, "MMMM dd, yyy")} </h2>
                <h2> On this day, the birthdays have</h2>

                {selectedDayBirthdays.map((date: Birthday, index: number) => (
                  <li key={index}>
                    <Person {...date} />
                    <Modal
                      open={showModal}
                      onClose={() => setShowModal(false)}
                      date={date.date}
                    />
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
      </div>
    </div>
  );
};

export default Calendar;

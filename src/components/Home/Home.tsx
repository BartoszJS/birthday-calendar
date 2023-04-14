import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import { useSelector } from "react-redux";
import { compareAsc, differenceInDays, parse } from "date-fns";
import { Birthday } from "../../redux/birthdaySlice";

import { MdNotifications } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

import {
  AiOutlineForm,
  AiOutlineCalendar,
  AiOutlineSearch,
} from "react-icons/ai";
import { useState } from "react";
import List from "./List";
import Person from "../Person/Person";
import Search from "./Search";

const Home = () => {
  const addBirthdayState = useSelector((state: any) => state.addBirthday);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const positiveData = [...addBirthdayState]
    .filter(
      (birthday) =>
        differenceInDays(
          parse(birthday.date, "yyyy-MM-dd", new Date()),
          new Date()
        ) >= 0
    )
    .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)));
  const negativeData = [...addBirthdayState]
    .filter(
      (birthday) =>
        differenceInDays(
          parse(birthday.date, "yyyy-MM-dd", new Date()),
          new Date()
        ) < 0
    )
    .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)));

  const newestData = [...positiveData, ...negativeData].slice(0, 3);

  return (
    <div className={styles.home}>
      <div className={styles.links}>
        <Link to='/birthday-form' className={styles.link}>
          <AiOutlineForm />
          <div>Form</div>
        </Link>
        <Link to='/calendar' className={styles.link}>
          <AiOutlineCalendar />
          <div>Calendar</div>
        </Link>
        <div className={styles.link}>
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
              <Search handleChangeCalendar={(date: string) => {}} />
            )}
          </div>
        </div>
        <div
          onClick={() => setIsOpenAlert(!isOpenAlert)}
          className={styles.link}
        >
          {isOpenAlert ? (
            <div>
              <div className={styles.triangle}></div>
              <RxCross1
                className={styles.icon}
                onClick={() => setIsOpenAlert(!isOpenAlert)}
              />
            </div>
          ) : (
            <MdNotifications
              className={styles.icon}
              onClick={() => setIsOpenAlert(!isOpenAlert)}
            />
          )}
          <div className={styles.alert__list}>{isOpenAlert && <List />}</div>
        </div>
      </div>

      <div className={styles.newest}>
        {newestData.length === 0 ? (
          <h2>No birthdays</h2>
        ) : (
          <div className={styles.single__person}>
            <h2>The earliest birthdays will be</h2>
            {newestData.map((birthdayData: Birthday, index) => (
              <div key={index}>
                <Person {...birthdayData} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

import { Link } from "react-router-dom";
import { TiArrowBack, TiArrowForward } from "react-icons/ti";
import { FiHome } from "react-icons/fi";

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
import Calendar from "../Calendar/Calendar";

import styles from "./Navigation.module.scss";

interface Props {
  nextTo: string;
  nextText: string;
  prevTo: string;
  prevText: string;
}

const Navigation = () => {
  const addBirthdayState = useSelector((state: any) => state.addBirthday);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  return (
    <div className={styles.navigation}>
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
      <div onClick={() => setIsOpenAlert(!isOpenAlert)} className={styles.link}>
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
  );
};

export default Navigation;

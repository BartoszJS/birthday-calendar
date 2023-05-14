import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdNotifications } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  AiOutlineForm,
  AiOutlineCalendar,
  AiOutlineSearch,
} from "react-icons/ai";
import { useState } from "react";
import List from "./List";
import Search from "./Search";
import styles from "./Navigation.module.scss";

const Navigation = () => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  return (
    <div className={styles.navigation}>
      <Link to='/calendar' className={styles.link}>
        <AiOutlineCalendar />
        <div>Calendar</div>
      </Link>
      <Link to='/birthday-form' className={styles.link}>
        <AiOutlineForm />
        <div>Form</div>
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

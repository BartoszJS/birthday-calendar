import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./Modal.module.scss";

import { ImCross } from "react-icons/im";
import { RootState } from "../../redux/store";
import { Birthday } from "../../redux/birthdaySlice";
import Person from "../Person/Person";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  date: string;
}

const Modal = ({ open, onClose, date }: ModalProps) => {
  const addBirthdayState = useSelector((state: RootState) => state.addBirthday);
  const [searchBirthday, setSearchBirthday] =
    useState<Birthday[]>(addBirthdayState);

  useEffect(() => {
    const searchedBirthdays = addBirthdayState.filter((item: Birthday) =>
      item.date.toLowerCase().includes(date.toLowerCase())
    );
    setSearchBirthday(searchedBirthdays);
  }, [addBirthdayState, date]);

  if (!open) return null;
  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modal__content}>
        <div className={styles.modal__button_container}>
          <button className={styles.modal__cross} onClick={onClose}>
            <ImCross />
          </button>
        </div>
        <h2> On this day, the birthdays have</h2>
        {searchBirthday.map((data: Birthday, index: number) => (
          <Person {...data} />
        ))}
      </div>
    </div>
  );
};

export default Modal;

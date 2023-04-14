import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Birthday, birthdayActions } from "../../redux/birthdaySlice";
import styles from "./Home.module.scss";
import { motion } from "framer-motion";

interface ModalProps {
  handleChangeCalendar: (date: string) => void;
}

const Search = ({ handleChangeCalendar }: ModalProps) => {
  const addBirthdayState = useSelector((state: RootState) => state.addBirthday);
  const dispatch = useDispatch();
  const [searchBirthday, setSearchBirthday] =
    useState<Birthday[]>(addBirthdayState);

  const handleDelete = (index: number) => {
    dispatch(birthdayActions.remove(index));
  };

  const handleClickDelete = (
    name: string,
    surname: string,
    date: string,
    interests: string
  ) => {
    const id = findId(name, surname, date, interests);
    handleDelete(id);
  };

  const findId = (
    name: string,
    surname: string,
    date: string,
    interests: string
  ) => {
    return addBirthdayState.findIndex(
      (birthday: Birthday) =>
        birthday.name === name &&
        birthday.surname === surname &&
        birthday.date === date &&
        birthday.interests === interests
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    const searchedBirthdays = addBirthdayState.filter(
      (item: Birthday) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.interests.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchBirthday(searchedBirthdays);
  };

  useEffect(() => {
    setSearchBirthday(addBirthdayState);
  }, [addBirthdayState]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 250 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.search}
    >
      <input
        className={styles.input__search}
        type='text'
        placeholder='search'
        onChange={handleSearch}
      />
      {searchBirthday.map((data: Birthday, index: number) => (
        <div
          onClick={() => handleChangeCalendar(data.date)}
          className={styles.single__person}
          key={index}
        >
          <div>
            <p> {data.name + " " + data.surname}</p>
            <p> Birthday date: {data.date}</p>
          </div>

          <button
            className={styles.delete__button}
            onClick={() =>
              handleClickDelete(
                data.name,
                data.surname,
                data.date,
                data.interests
              )
            }
          >
            Delete
          </button>
        </div>
      ))}
    </motion.div>
  );
};

export default Search;

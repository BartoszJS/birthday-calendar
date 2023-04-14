import { motion } from "framer-motion";
import styles from "./Home.module.scss";
import { useSelector } from "react-redux";
import { compareAsc, differenceInDays, parse, startOfToday } from "date-fns";
import { Birthday } from "../../redux/birthdaySlice";
import Person from "../Person/Person";

const List = () => {
  const today = startOfToday();
  const addBirthdayState = useSelector((state: any) => state.addBirthday);
  const twoWeeksRemainder = [...addBirthdayState]
    .filter((birthday) => {
      const daysDifference = differenceInDays(
        parse(birthday.date, "yyyy-MM-dd", new Date()),
        new Date()
      );
      return daysDifference >= 0 && daysDifference <= 14;
    })
    .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)));

  const daysToBth = (date: string) => {
    return differenceInDays(parse(date, "yyyy-MM-dd", new Date()), today);
  };

  return (
    <motion.ul
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 250 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.list}
    >
      <h3>All birthdays in 2 weeks</h3>
      {twoWeeksRemainder.length > 0 ? (
        twoWeeksRemainder.map((item: Birthday) => <Person {...item} />)
      ) : (
        <p>No birthdays in 2 weeks</p>
      )}
    </motion.ul>
  );
};

export default List;

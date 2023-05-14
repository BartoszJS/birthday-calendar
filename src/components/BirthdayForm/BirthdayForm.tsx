import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { RiCake2Line } from "react-icons/ri";

import { birthdayActions } from "../../redux/birthdaySlice";
import styles from "./BirthdayForm.module.scss";

type Inputs = {
  name: string;
  surname: string;
  date: Date;
  interests: string;
};

const BirthdayForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({
    name,
    surname,
    date,
    interests,
  }) => {
    dispatch(
      birthdayActions.add({
        name: name,
        surname: surname,
        date: date,
        interests: interests,
      })
    );
    navigate("/calendar");
  };
  return (
    <div className={styles.birthday}>
      <form className={styles.birthday__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.birthday__title}>
          <div className={styles.birthday__title__cake}>
            <RiCake2Line />
          </div>
          <h1>ADD BIRTHDAY</h1>
        </div>
        <label>
          <input
            type='name'
            placeholder='name'
            className={styles.birthday__input}
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className={styles.birthday__error}>Enter a valid name</p>
          )}
        </label>
        <label>
          <input
            type='text'
            placeholder='surname'
            className={styles.birthday__input}
            {...register("surname", { required: true })}
          />
          {errors.surname && (
            <p className={styles.birthday__error}>Enter a valid surname</p>
          )}
        </label>
        <label>
          <input
            type='date'
            className={styles.birthday__input}
            {...register("date", { required: true })}
          />
          {errors.surname && (
            <p className={styles.birthday__error}>Enter a valid date</p>
          )}
        </label>
        <label>
          <textarea
            rows={4}
            placeholder='interests'
            className={`${styles.birthday__input} textarea`}
            {...register("interests", { required: false })}
          />
          {errors.surname && (
            <p className={styles.birthday__error}>Enter a valid interests</p>
          )}
        </label>
        <button className={styles.birthday__button}>Submit</button>
      </form>
    </div>
  );
};

export default BirthdayForm;

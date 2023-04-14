import { Link } from "react-router-dom";
import { TiArrowBack, TiArrowForward } from "react-icons/ti";
import { FiHome } from "react-icons/fi";
import { AiOutlineForm, AiOutlineCalendar } from "react-icons/ai";

import styles from "./Navigation.module.scss";

interface Props {
  nextTo: string;
  nextText: string;
  prevTo: string;
  prevText: string;
}

const Navigation = ({ nextText, nextTo, prevText, prevTo }: Props) => {
  const BackIcon = prevText === "FiHome" ? FiHome : AiOutlineForm;
  const NextIcon =
    nextText === "AiOutlineForm" ? AiOutlineForm : AiOutlineCalendar;
  return (
    <div className={styles.navigation}>
      <div>
        <Link to={prevTo}>
          <TiArrowBack />
          <BackIcon />
        </Link>
      </div>
      <div>
        <Link to={nextTo}>
          <NextIcon />
          <TiArrowForward />
        </Link>
      </div>
    </div>
  );
};

export default Navigation;

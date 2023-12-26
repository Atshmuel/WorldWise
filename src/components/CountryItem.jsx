import styles from "./CountryItem.module.css";
import getFlag from "../assets/getFlag";
function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{getFlag(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;

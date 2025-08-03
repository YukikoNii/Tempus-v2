import styles from "./AppHeader.module.css";
import { Link } from 'react-router-dom';

type Item = {
    name : string,
    link : string,
    onClick? : () => void
}

const Dropdown = ( {items} : { items: Item[] } ) => {
  return (
    <div className={styles.dropDown}>
        <div className={styles.dropDownContent}>
            {items.map((item, index) => (
                <Link key={index} to={item.link} onClick={item.onClick} className={styles.dropDownLink}>
                    {item.name}
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Dropdown

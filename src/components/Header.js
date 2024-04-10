import { Link } from "react-router-dom";
import styles from "../css/Header.module.css";

function Header() {
    return(
        /* header */
        <header className={styles.header}> 
            <h1 className={styles.title}>SOHEEFLIX</h1>
            <nav className={styles.nav}> 
                <ul className={styles.menu}>
                    <Link to={`/`}>
                        <li>HOME</li>
                    </Link>
                    <Link to={`/movie`}>
                    <li>MOVIE</li>
                    </Link>
                    <Link to={`/recommend`}>
                        <li>RECOMMEND</li>
                    </Link>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
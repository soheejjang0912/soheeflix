import styles from "../css/Header.module.css";

function Header() {
    return(
        /* header */
        <header className={styles.header}> 
            <h1 className={styles.title}>SOHEEFLIX</h1>
            <nav className={styles.nav}> 
                <ul className={styles.menu}>
                    <li><a href="/">HOME</a></li>
                    <li><a href="/movie">MOVIE</a></li>
                    <li><a href="/">RECOMMAND</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
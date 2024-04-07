import styles from "../css/Header.module.css";

function Header() {
    return(
        /* header */
        <header className={styles.header}> 
            <h1 className={styles.title}>SOHEEFLIX</h1>
            <nav className={styles.nav__right}> 
                <ul className={styles.menu}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Movie</a></li>
                    <li><a href="/">Recommand</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
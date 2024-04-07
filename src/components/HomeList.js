import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../css/Home.module.css";

function HomeList({id, coverImage, title, index}){
    return (
        <div className={styles.image__wrapper}>  
            <Link to={`/movie/${id}`}>
                <img src={coverImage} alt={title}></img>
            </Link>
        </div>
    );
}

HomeList.prototype = {
    id: PropTypes.number.isRequired,
    coverImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default HomeList;
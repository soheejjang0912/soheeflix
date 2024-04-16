import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../css/Movie.module.css";

function Movie({id, coverImage, title, index}){
    return (
        <div> 
            <div className={styles.image__wrapper}>  
                <Link to={`/movie/${id}`}>
                    <img src={coverImage} alt={title}></img>
                </Link>
            </div>
        </div> 
    );
}

Movie.prototype = {
    id: PropTypes.number.isRequired,
    coverImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Movie;
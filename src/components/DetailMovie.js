import PropTypes from "prop-types";

function DetailMovie({title_long, medium_cover_image, description_full}){
    console.log("?", title_long, medium_cover_image, description_full);
    return (
        <div>
            <h2>{title_long}</h2>
            <img src={medium_cover_image}></img>
            <h4>{description_full}</h4>
        </div>
    );
}

DetailMovie.prototype = {
    title_long: PropTypes.number.isRequired,
    medium_cover_image: PropTypes.string.isRequired,
    description_full: PropTypes.string.isRequired,
};

export default DetailMovie;
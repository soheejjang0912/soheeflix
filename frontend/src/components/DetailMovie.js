import PropTypes from "prop-types";
import styles from "../css/Common.module.css";
import dstyles from "../css/DetailMovie.module.css";

function DetailMovie({background_image_original, title_long, rating, image, description_full, genres}){
    const backgroundImage = {
        backgroundImage: `url(${background_image_original})`, // 배경 이미지 경로
        width: '100vw', // 화면 너비의 100%로 설정
        height: '100vh', // 화면 높이의 100%로 설정
        backgroundSize: 'cover', // 배경 이미지를 컨테이너에 맞게 확대
        backgroundPosition: 'center' // 배경 이미지를 가운데 정렬
    };
    
    return (
        <div style={backgroundImage}> 
            <div className={dstyles.detail__container}>
                <div className={dstyles.flex}>
                    <img src={image}></img>
                    <div>
                        <h2 className={styles.title__font}>{title_long}</h2>
                        <h4 className={styles.normal__font}>평점 : {rating}</h4>
                        <ul className={styles.normal__font}>
                            {genres.map((g) => (
                                <li key={g}>{g}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

DetailMovie.prototype = {
    title_long: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description_full: PropTypes.string.isRequired,
};

export default DetailMovie;
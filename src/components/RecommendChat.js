import styles from "../css/Recommend.module.css";

function RecommendChat({id, coverImage, title, synopsis,runtime,rating}){
    return ( 
        <div key={id} className={styles.recommend__display}>  
            <div className={styles.img}>
                <img src={coverImage} alt={title}></img>
            </div>
            <div>
                <p>{title}</p> 
                <p>runtime : {runtime}</p> 
                <p>rating : {rating}</p> 
                <p>{synopsis}</p>
            </div>
        </div> 
    );
}


export default RecommendChat;
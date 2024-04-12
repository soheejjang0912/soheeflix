import styles from "../css/Recommend.module.css";

function RecommendChat({id, coverImage, title, index}){
    return ( 
        <div>  
            <div>
                <img src={coverImage} alt={title}></img>
            </div>
        </div> 
    );
}


export default RecommendChat;
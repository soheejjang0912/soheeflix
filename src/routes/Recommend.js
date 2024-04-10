import Header from "../components/Header";
import RecommendChat from "../components/RecommendChat";
import styles from "../css/Recommend.module.css";
import sohee from "../img/sohee.jpg";

function Recommend(){
    
    return ( 
        <div>
            <Header />
            <div className={styles.chat}>
                <div className={styles.chat__message}>
                    <div className={styles.message__container}> 
                        <div className={styles.image__container}>
                            <img className={styles.size} src={sohee} alt="이미지" />
                        </div>
                        <div className={styles.sohee}>
                            <p>안녕하세요! 영화 추천을 도와드리겠습니다. 어떤 장르의 영화를 좋아하시나요?</p>
                        </div> 
                    </div>

                    <div className={styles.message__container}>  
                        <div className={styles.message}>
                            <p>안녕하세요! 영화 추천을 도와드리겠습니다. 어떤 장르의 영화를 좋아하시나요?</p>
                        </div> 
                    </div>
                </div>
                <div className={styles.chat__send}>
                    <div className={styles.input__container}>
                        <input type="text" className={styles.input__field} placeholder="메시지를 입력하세요..." />
                        <button className={styles.input__button}>전송</button>
                    </div>
                     
                </div>
            </div> 
        </div>
    );
}

export default Recommend;
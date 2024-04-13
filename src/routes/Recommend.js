import { useState } from "react";
import Header from "../components/Header";
import RecommendChat from "../components/RecommendChat";
import styles from "../css/Recommend.module.css";
import sohee from "../img/sohee.jpg";

function Recommend(){
    const [messageContent, setMessageContent] = useState("");
    const [messages, setMessages] = useState("");
    const [recommendMovies, setRecommendMovies] = useState([]);
   
    // 메시지 입력값 변경 시 호출되는 함수
    const handleMessageContentChange = (event) => {
        setMessageContent(event.target.value);
    };

    // 전송 버튼 클릭 시 호출되는 함수
    const sendButtonClick = () => {
        // 입력한 메시지를 메시지 목록에 추가하고, 메시지 내용 초기화
        setMessages(messageContent);
        setMessageContent("");

        recommendMoviesApi();
    };
 
    const recommendMoviesApi = async () => {
        // 추천 영화 목록 가져오기
        const response = await fetch(
            `https://yts-proxy.now.sh/list_movies.json?genre=${messageContent}`
        );
        const json = await response.json();
        setRecommendMovies(prevMovies => [...prevMovies, ...json.data.movies]); 
    }; 
    
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

                    <div>  
                        <div key={messageContent} className={styles.message__container}>
                            <div className={styles.message}>
                                <p>{messages}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        {/* 추천 영화 목록 렌더링 */}
                        { 
                            <div>
                                {recommendMovies.map((movie, index) => (
                                    <RecommendChat 
                                        key={movie.id}
                                        id={movie.id}
                                        coverImage={movie.medium_cover_image}
                                        title={movie.title}
                                        index={index} 
                                    />
                                ))} 
                            </div>
                        } 
                    </div>
                    
                    
                </div>
                <div className={styles.chat__send}>
                    <div className={styles.input__container}>
                        <input 
                            type="text" 
                            className={styles.input__field} 
                            placeholder="메시지를 입력하세요..." 
                            value={messageContent}
                            onChange={handleMessageContentChange} 
                        />
                        <button onClick={sendButtonClick} className={styles.input__button}>전송</button>
                    </div>
                     
                </div>
            </div> 
        </div>
    );
}

export default Recommend;
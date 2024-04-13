import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import RecommendChat from "../components/RecommendChat";
import styles from "../css/Recommend.module.css";
import sohee from "../img/sohee.jpg";

function Recommend(){
    const [message, setMessage] = useState('');
    const [recommend, setRecommend] = useState([]);
    const scrollRef = useRef(null); 

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = async () => {
        if (message.trim() !== '') { 
            // 메시지 전송 후 추가적인 처리: 메시지를 입력한 사용자에 대한 메시지를 추가
            setRecommend(recommendContent => [
                ...recommendContent,
                { message, type: 'user' }, // 사용자가 입력한 메시지
                // API를 통해 받아온 영화 목록을 추가합니다.
                { message: <p>추천 영화 목록을 가져오는 중입니다...</p>, type: 'sohee' } //임시 메시지
            ]);
            setMessage('');
    
            try {
                const response = await fetch(`https://yts-proxy.now.sh/list_movies.json?genre=${message}`);
                const json = await response.json(); 
                const movies = json.data.movies.slice(0, 3); // 상위 3개의 영화만 선택합니다.
    
                // 받아온 영화 목록을 메시지로 추가합니다.
                setRecommend(recommendContent => [
                    ...recommendContent.slice(0, -1), // 임시 메시지는 제거합니다.
                    ...movies.map(movie => (
                        { 
                            message: ( 
                                <RecommendChat 
                                    key={movie.id}
                                    id={movie.id}
                                    coverImage={movie.medium_cover_image}
                                    title={movie.title}
                                    summary={movie.summary}
                                    runtime={movie.runtime}
                                    rating={movie.rating}
                                />
                            ), 
                            type: 'sohee' 
                        })), // 각 영화 제목을 메시지로 추가합니다.
                    { message:
                        <p>
                            마음에 드셨나요? 영화를 추천받고 싶으면 좋아하는 장르를 다시 입력해 주세요.
                        </p>
                    , type: 'sohee' } // 완료 메시지를 추가합니다.
                ]);
            } catch (error) {
                console.error(<p>영화 목록을 가져오는 도중 오류가 발생했습니다:</p>, error);
                setRecommend(recommendContent => [
                    ...recommendContent.slice(0, -1), // 임시 메시지는 제거합니다.
                    { message: <p>영화 목록을 가져오는 도중 오류가 발생했습니다. 영화를 추천받고 싶으면 좋아하는 장르를 다시 입력해 주세요.</p>, type: 'sohee' } // 오류 메시지를 추가합니다.
                ]);
            }
        }
    }; 
    

    // 채팅 메시지가 업데이트될 때마다 스크롤을 아래로 이동
    useEffect(() => { 
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [recommend]); 
    return (
        <div>
            <Header />
            <div className={styles.chat}>
                <div className={styles.chat__message}  ref={scrollRef}>
                    <div className={styles.message__container}> 
                        <div className={styles.image__container}>
                            <img className={styles.size} src={sohee} alt="이미지" />
                        </div>
                        <div className={styles.sohee}>
                            <p>안녕하세요! 영화 추천을 도와드리겠습니다. 어떤 장르의 영화를 좋아하시나요?</p>
                        </div> 
                    </div>  

                    <div className="chat-window">
                        {recommend.map((msg, index) => (
                            msg.type === 'user' ? (
                                <div key={index} className={styles.message__container}>
                                    <div className={styles.message}>
                                        <p>{msg.message}</p>
                                    </div>
                                </div>
                            ) : (
                                <div key={index} className={styles.message__container}> 
                                    <div className={styles.image__container}>
                                        <img className={styles.size} src={sohee} alt="이미지" />
                                    </div>
                                    <div className={styles.sohee}>
                                        {msg.message}
                                    </div> 
                                </div> 
                            )
                        ))}
                    </div>
                    

                    
                </div>
            </div>



            <div className={styles.chat__send}>
                <div className={styles.input__container}>
                    <input 
                        type="text" 
                        className={styles.input__field} 
                        placeholder="메시지를 입력하세요..." 
                        value={message}
                        onChange={handleMessageChange} 
                    />
                    <button onClick={handleSendMessage} className={styles.input__button}>전송</button>
                </div>
                    
            </div> 

        </div>
    );
}

export default Recommend;
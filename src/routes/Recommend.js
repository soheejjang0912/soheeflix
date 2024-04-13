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

    const handleSendMessage = () => {
        if (message.trim() !== '') { 
            // 메시지 전송 후 추가적인 처리: 메시지를 입력한 사용자에 대한 메시지를 추가
            setRecommend(recommendContent => [
                ...recommendContent,
                { message, type: 'user' }, // 사용자가 입력한 메시지
                { message: `${message}을 입력하셨습니다`, type: 'sohee' } //api
            ]);
            setMessage('');
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
                                        <p>{msg.message}</p>
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
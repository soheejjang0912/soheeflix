import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import RecommendChat from "../components/RecommendChat";
import styles from "../css/Recommend.module.css";
import sohee from "../img/sohee.jpg";

function Recommend(){
    const [message, setMessage] = useState('');
    const [recommend, setRecommend] = useState([]);
    const [btnState, setBtnState] = useState(false);
    const scrollRef = useRef(null); 

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const buttonGenre = (genre) => { 
        setBtnState(true);
        setMessage(genre); 
        
    }

    const handleSendMessage = async () => {  
        if (message.trim() !== '') { 
            // 메시지 전송 후 추가적인 처리: 메시지를 입력한 사용자에 대한 메시지를 추가
            setRecommend(recommendContent => [
                ...recommendContent,
                { message, type: 'user' }, // 사용자가 입력한 메시지
               
                { message: <p>Getting a list of recommended movies...</p>, type: 'sohee' } //임시 메시지
            ]); 
            
            try {
                const response = await fetch(`https://yts-proxy.now.sh/list_movies.json?limit=3&genre=${message}`);
                const json = await response.json(); 
                const movies = json.data.movies; // 상위 3개의 영화만 선택
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                // 받아온 영화 목록을 메시지로 추가
                setRecommend(recommendContent => [
                    ...recommendContent.slice(0, -1), // 임시 메시지는 제거
                    ...movies.map(movie => (
                        { 
                            message: ( 
                                <RecommendChat 
                                    key={movie.id}
                                    id={movie.id}
                                    coverImage={movie.medium_cover_image}
                                    title={movie.title_long}
                                    runtime={movie.runtime}
                                    rating={movie.rating}
                                    synopsis={movie.synopsis}
                                />
                            ), 
                            type: 'sohee' 
                        })), // 각 영화 제목을 메시지로 추가
                    { message: 
                        <div>
                            <p>
                            Did you like it? If you want a movie recommendation, please re-enter your favorite genre.
                            </p> 
                            <button className={styles.button} onClick={() => buttonGenre('comedy')}>코미디</button> 
                            <button className={styles.button} onClick={() => buttonGenre('action')}>액션</button>
                            <button className={styles.button} onClick={() => buttonGenre('history')}>역사</button>
                            <button className={styles.button} onClick={() => buttonGenre('romance')}>로맨스</button>
                            <button className={styles.button} onClick={() => buttonGenre('music')}>음악</button>
                        </div> 
                    , type: 'sohee' } // 완료 메시지
                ]);
                setMessage('');
            } catch (error) {
                console.error(<p>Error getting movie list:</p>, error);
                setRecommend(recommendContent => [
                    ...recommendContent.slice(0, -1), // 임시 메시지는 제거
                    { message: <p>An error occurred while fetching the movie list. If you want to recommend a movie, please re-enter your favorite genre.</p>, type: 'sohee' } // 오류 메시지를 추가합니다.
                ]);
                setMessage('');
            }
        }else{
            handleSendMessage();
        }
    }; 
 
    useEffect(() => {  
        if(btnState===true){ 
            handleSendMessage();
            setBtnState(false);
        }
    }, [message]); 

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
                            <p>Hello! Let me help you recommend a movie. What genre of movie do you like?</p> 
                            <button className={styles.button} onClick={() => buttonGenre('comedy')}>Comedy</button> 
                            <button className={styles.button} onClick={() => buttonGenre('action')}>Action</button>
                            <button className={styles.button} onClick={() => buttonGenre('history')}>History</button>
                            <button className={styles.button} onClick={() => buttonGenre('romance')}>Romance</button>
                            <button className={styles.button} onClick={() => buttonGenre('music')}>Music</button>
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
                        placeholder="Comedy, Action, History.. " 
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
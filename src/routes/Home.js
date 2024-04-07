import { useEffect, useState } from "react";
import styles from "../css/Home.module.css";

function Home(){
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async() => {
        const response = await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
        );
        const json = await response.json();
        setMovies(json.data.movies);
        setLoading(false);
    };
    useEffect(()=> {
        getMovies();
    }, []);
    console.log(movies);
    return (
        <div className={styles.centered}> 
            <h1 className={styles.title}>SOHEEFLIX</h1>
            <button className={styles.button}> 무료로 시작하기</button>
        </div>
    );
}
export default Home;
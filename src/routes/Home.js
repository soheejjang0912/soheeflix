import { useEffect, useState } from "react";
import styles from "../css/Home.module.css";
import { Link } from "react-router-dom"; 
import HomeList from "../components/HomeList"; 

function Home(){
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async() => {
        const response = await fetch(
            `https://yts-proxy.now.sh/list_movies.json?minimum_rating=8.8&sort_by=date_added`
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
        <div className={styles.home__container}> 
            <div className={styles.insert__container}>
                <h1 className={styles.title}>SOHEEFLIX</h1>
                <Link to={`/movie/`}>
                    <button className={styles.button}> 무료로 시작하기</button>
                </Link>
            </div> 
            <div className={styles.block__container}></div>
            {   
                loading ?  <h1>loading...</h1> 
                : (<div className={styles.image__container}>
                        {
                            movies.map((movie, index)=>
                                <HomeList 
                                    key={movie.id}
                                    id={movie.id}
                                    coverImage={movie.large_cover_image}
                                    title={movie.title}
                                    index={movie.index}
                                />
                            ) 
                        } 
                    </div>)
            } 
        </div>  
    );
}
export default Home;
import { useEffect, useState } from "react";
import Movie from "../components/Movie"; 
import Header from "../components/Header";
import styles from "../css/Movie.module.css";
import cstyles from "../css/Common.module.css";

function Home(){
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [goodmMovies, setGoodMovies] = useState([]);
    const getGoodMovies = async() => {
        const response = await fetch(
            `https://yts-proxy.now.sh/list_movies.json?minimum_rating=9&sort_by=year`
        );
        const json = await response.json();
        setGoodMovies(json.data.movies);
        setLoading(false);
    };
    const getMovies = async() => {
        const response = await fetch(
            `https://yts-proxy.now.sh/list_movies.json?minimum_rating=1&sort_by=year`
        );
        const json = await response.json();
        setMovies(json.data.movies);
        setLoading(false);
    };
    useEffect(()=> {
        getGoodMovies();
        getMovies();
    }, []);
 
    return (
        <div>
            <Header />
            {   
                loading ?  <h1>loading...</h1> 
                : (
                    <div>
                        <div >
                            <h1 className={cstyles.normal__font}>최신 영화</h1>
                            <div className={styles.image_container}> 
                                {
                                    movies.map((movie, index)=>
                                        <Movie 
                                            key={movie.id}
                                            id={movie.id}
                                            coverImage={movie.medium_cover_image}
                                            title={movie.title}
                                            index={movie.index}
                                        />
                                    ) 
                                }
                            </div>
                        </div>
                        
                        <div>
                            <h1 className={cstyles.normal__font}>고평점 영화</h1>
                            <div className={styles.image_container}> 
                                {
                                    goodmMovies.map((movie, index)=>
                                        <Movie 
                                            key={movie.id}
                                            id={movie.id}
                                            coverImage={movie.medium_cover_image}
                                            title={movie.title}
                                            index={movie.index}
                                        />
                                    ) 
                                }
                            </div>
                        </div>

                    </div>
                )
            } 
        </div>
    );
}
export default Home;
import { useEffect, useState } from "react";
import Movie from "../components/Movie"; 
import Header from "../components/Header";
import styles from "../css/Movie.module.css";

function Home(){
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async() => {
        const response = await fetch(
            `https://yts-proxy.now.sh/list_movies.json?minimum_rating=8.8&sort_by=year`
        );
        const json = await response.json();
        setMovies(json.data.movies);
        setLoading(false);
    };
    useEffect(()=> {
        getMovies();
    }, []);
 
    return (
        <div>
            <Header />
            {   
                loading ?  <h1>loading...</h1> 
                : (<div className={styles.image_container}>
                        {
                            movies.map((movie, index)=>
                                <Movie 
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
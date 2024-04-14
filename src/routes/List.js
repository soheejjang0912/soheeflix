import { useEffect, useState } from "react";
import Movie from "../components/Movie"; 
import Header from "../components/Header";
import styles from "../css/Movie.module.css";
import cstyles from "../css/Common.module.css";

function Home(){
    const [loading, setLoading] = useState(4);
    const [movies, setMovies] = useState([]);
    const [goodmMovies, setGoodMovies] = useState([]);
    const [comedyMovies, seComedyMovies] = useState([]);
    const [actionmMovies, setActionMovies] = useState([]);
    const getGoodMovies = async() => {
        const response = await fetch(
            `https://yts-proxy.now.sh/list_movies.json?minimum_rating=9`
        );
        const json = await response.json();
        setGoodMovies(json.data.movies);
        setLoading((val)=>val-1);
    };
    const getMovies = async() => {
        const response = await fetch(
            `https://yts-proxy.now.sh/list_movies.json?sort_by=year`
        );
        const json = await response.json();
        setMovies(json.data.movies);
        setLoading((val)=>val-1);
    };
    const getComedyMovies = async() => {
        const response = await fetch(
            `https://yts-proxy.now.sh/list_movies.json?minimum_rating=6&genre=Comedy`
        );
        const json = await response.json();
        seComedyMovies(json.data.movies);
        setLoading((val)=>val-1);
    };
    const getActionMovies = async() => {
        const response = await fetch(
            `https://yts-proxy.now.sh/list_movies.json?minimum_rating=6&genre=Action`
        );
        const json = await response.json();
        setActionMovies(json.data.movies);
        setLoading((val)=>val-1);
    };
    useEffect(()=> {
        getGoodMovies();
        getMovies();
        getComedyMovies();
        getActionMovies();
    }, []);  
    return (
        <div>
            <Header />
            {   
                loading !== 0 ?  <h1 className={cstyles.loading}>loading...</h1> 
                : (
                    <div>
                        <div >
                            <h1 className={cstyles.normal__font}>Newly released movies</h1>
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
                            <h1 className={cstyles.normal__font}>Hight rated movies</h1>
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

                        <div >
                            <h1 className={cstyles.normal__font}>Comedy Movives</h1>
                            <div className={styles.image_container}> 
                                {
                                    comedyMovies.map((movie, index)=>
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

                        <div >
                            <h1 className={cstyles.normal__font}>Action Movives</h1>
                            <div className={styles.image_container}> 
                                {
                                    actionmMovies.map((movie, index)=>
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
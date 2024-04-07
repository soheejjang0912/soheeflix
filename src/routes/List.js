import { useEffect, useState } from "react";
import Movie from "../components/Movie"; //이거때문에 진짜 시간 엄청 씀..

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
        <div>
        {
            loading ? <h1>loading...</h1> 
            : (<div>
            {
                movies.map((movie)=>
                <Movie 
                    key={movie.id}
                    id={movie.id}
                    coverImage={movie.medium_cover_image}
                    title={movie.title}
                    summary={movie.summary}
                    genres={movie.genres}
                />
                ) 
            }
            </div>)
        }
        <h1>soheeflix</h1>
        </div>
    );
}
export default Home;
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";

function Detail(){
    const [movie, setMovies] = useState([]);
    const {id} = useParams();
    const getMovie = async () => {
        const response = await fetch(
            `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
        );
        const json = await response.json(); 
        setMovies(json.data.movie);
    };
    
    console.log(movie);
    useEffect(()=>{
        getMovie();
    }, []);
    return (
        <div>
            <Header />
            <h2>{movie.title_long}</h2>
            <img src={movie.medium_cover_image}></img>
            <h4>{movie.description_full}</h4>
        </div>
    );
}

export default Detail;
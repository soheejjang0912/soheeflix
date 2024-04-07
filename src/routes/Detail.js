import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import DetailMovie from "../components/DetailMovie";

function Detail(){
    const [loading, setLoading] = useState(true);
    const [movie, setMovies] = useState([]);
    const {id} = useParams();
    const getMovie = async () => {
        const response = await fetch(
            `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
        );
        const json = await response.json(); 
        setMovies(json.data.movie);
        setLoading(false);
    }; 
    useEffect(()=>{
        getMovie();
    }, []);
    console.log(movie.description_full);
    return (
        <div>
            <Header /> 
            {   
                loading ? <h1>loading...</h1> 
                : (<div>
                {    
                    <DetailMovie
                        title_long={movie.title_long}
                        medium_cover_image={movie.medium_cover_image}
                        description_full={movie.description_full} 
                    /> 
                }
                </div>)
            } 
        </div>
    );
}

export default Detail;
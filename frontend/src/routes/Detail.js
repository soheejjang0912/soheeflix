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
            `https://yts-proxy.now.sh/movie_details.json?movie_id=${id}`
        );
        const json = await response.json(); 
        setMovies(json.data.movie);
        setLoading(false);
    }; 
    useEffect(()=>{
        getMovie();
    }, []); 
    return (
        <div>
            <Header /> 
            {   
                loading ? <h1>loading...</h1> 
                : (<div>
                {    
                    <DetailMovie
                        background_image_original={movie.background_image_original}
                        title_long={movie.title_long}
                        rating={movie.rating}
                        image={movie.medium_cover_image}
                        description_full={movie.description_full} 
                        genres={movie.genres}
                    /> 
                }
                </div>)
            } 
        </div>
    );
}

export default Detail;
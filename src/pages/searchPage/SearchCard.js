import {Link} from "react-router-dom";
import "./style/searchCard.css";
import React from "react";

const SearchCard = ({ anime}) => {
    return (
        <Link to={`/anime/${anime.mal_id}`} style={{ textDecoration: 'none'}} >
            <div className="search-image-container">
                <div>
                    <img
                        src={anime.images?.jpg?.image_url}
                        alt={anime.title}
                        className="search-image"
                    />
                </div>
                <div>
                    <div>
                        <p style={{fontSize:'16px', marginBottom: '10px', textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>
                            {anime.title}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default SearchCard;
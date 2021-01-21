import React from 'react';
// always addd {} to import a function 
import {addFavourite,removeFromFavourite} from '../actions/index'
class MovieCard extends React.Component{
    handleFavouriteClick =()=>{
        const {movie} = this.props;
        this.props.dispatch(addFavourite(movie));
    }
    handleUnFavouriteClick =()=>{
        const {movie}=this.props;
        this.props.dispatch(removeFromFavourite(movie));
    }
    render(){
        // here we are getting the movie as props from App.js 
        const {movie,isFavrouite}= this.props;
        return (
            <div className="movie-card">
                <div className="left">
                <img alt="movie-poster" src={movie.Poster}/>

                </div>
                <div className="right">
                    <div className="title">{movie.Title}</div>
                    <div className="plot">{movie.Plot}</div>
                    <div className="footer">
                        <div className="rating">{movie.imdbRating}</div>
                        {
                        isFavrouite
                        ?<button className="unfavourite-btn" onClick={this.handleUnFavouriteClick}>UnFavourite</button>
                        :<button className="favourite-btn" onClick={this.handleFavouriteClick}>Favourite</button>
                        }
                    </div>

                </div>

            </div>
        )
    }
}
export default MovieCard;
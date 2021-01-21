import React from 'react';
// removing the data from here because we will get it here via props 
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies} from '../actions/index';
import {setShowFavourites} from '../actions/index';
import { connect } from "../index";
import{storeContext} from '../index'

class App extends React.Component {
  // we made it a class component so that we can make API call , to fetch data from the data base 
  componentDidMount(){
    this.props.store.subscribe(() => this.forceUpdate());
     const {store} = this.props;

    // now we are calling the subscribe function of the store so that we can update the state in store (2nd)

    store.subscribe(()=>{
      console.log('UPDATED');
     //here the state will get updated  
      this.forceUpdate();
    })

    // make API call to get the movies 
    // dispatch the action, to reducers

    // whenever a dispatch is called (1st) it will dispatch an action and then it will go to subscribe
    this.props.store.dispatch(addMovies(data),console.log('dispatched'));
    // from here the subscribe will be called(as per REDUX flow diagram )
    // after the subscribe call the controller will reach here 
    // console.log('Current state',this.props.store.getState());
} 

  isMovieFavrouite=(movie)=>{
      const {movies}= this.props.store.getState();// extracting movies from the { {movies},{search} }
      // if index = -1, that mens the movie is not there in the list 
      const index = movies.Favourites.indexOf(movie);// Favourites is the object located in movies therefore we did this
      // movies .favourites 
      if (index!==-1) {
      // movie found 
      return true;
      }
      return false ;
    }

    onChangeTab=(val)=>{
      this.props.store.dispatch(setShowFavourites(val));
    }

  render (){
  // extracting  the movies from the state 
  const{ movies,search } = this.props.store.getState(); //{ {movies},{search} }
  const {list,Favourites,ShowFavourites} = movies 
  // console.log('RENDER',this.props.getState());
  const displayMovies = ShowFavourites ? Favourites:list;

  return (
    <div className="App">
    <Navbar  search={search}/>
    <div className="main">
    <div className="tabs">
    <div className={`tab${ShowFavourites ?'':'active-tabs' }` } onClick={()=>this.onChangeTab(false)}> Movies</div>
    <div className={`tab${ShowFavourites ?'active-tabs':'' }`}onClick={()=>this.onChangeTab(true)}> Favourites</div>
    </div>
    <div className="list"> 
    {/* iterating over the list using map function  */}
    {displayMovies.map((movie,index)=>(
      // giving movie via props to movie 
      // to have a unique key we are using the index over here 
      < MovieCard movie = {movie} key={`movies-${index}`} dispatch={this.props.store.dispatch} 
      isFavrouite ={this.isMovieFavrouite(movie)} />
    ))}

    </div>
    <div className="">
      {displayMovies.length===0?<div className="no-movies"> No movies to display..!!</div>:null}

    </div>
    </div>
    </div>
  );
    }
}
//we are making app wrapper over here 
// now we dont neet wrapper as we are using the connect 

class AppWrapper extends React.Component {
  render() {
    return (
      <storeContext.Consumer>
        {(store) => <App store={store} />}
      </storeContext.Consumer>
    );
  }
}

export default AppWrapper;




// this will pass actions to the reducers 
// {
//  type:'ADD_MOVIES',
//  movies:[m1,m2,m3]
// }

// {
//     type:"DECREASE_COUNT"
// }

// we are declaring it here because they are action types 
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const REMOVE_FROM_FAVOURITE='REMOVE_FROM_FAVOURITE';
export const SET_SHOW_FAVOURITE='SET_SHOW_FAVOURITE';
export const ADD_MOVIE_TO_LIST='ADD_MOVIE_TO_LIST';
export const ADD_SEARCH_RESULT='ADD_SEARCH_RESULT';



// action creators bcz they are returning an action 
export function addMovies(movies){
    return{
        type:'ADD_MOVIES',
      movies
    }
    
}
// creating another action to add favourites
export function addFavourite(movie){
  return{
      type:'ADD_FAVOURITE',
    movie
  }
}
// creating another action to remove Favourite
export function removeFromFavourite(movie){
  return{
      type:'REMOVE_FROM_FAVOURITE',
    movie
  }
}
// creating another action to show favourite
export  function setShowFavourites(val){
  return{
    type:'SET_SHOW_FAVOURITE',
    val
  }
}
// creating another action 
export function addMovieToList(movie) {
  return{
  type:'ADD_MOVIE_TO_LIST',
  movie
}  
}

//this kind of function is called as thunk which we will use as middleware
export function handleMovieSearch(movie) {
  const url =`http://www.omdbapi.com/?i=tt3896198&apikey=b143e8c2&t=${movie}`;
  return function(dispatch){
  fetch(url)
  // since the function has to import an object therefore we did response.json 
  .then(response=>response.json())
  .then(movie=>{
  console.log('movie',movie);
  // dispatch an action 
  dispatch(addMovieSearchResult(movie))
  console.log('DISPATCHED_FORM_HANDLEMOVIESEARCH');
})
}
}
export function addMovieSearchResult(movie){
  return{
    type:ADD_SEARCH_RESULT,
    movie
  };
}

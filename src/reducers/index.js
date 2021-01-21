import {combineReducers} from 'redux';
import {ADD_MOVIES, ADD_MOVIE_TO_LIST} from '../actions/index';
import {ADD_FAVOURITE} from '../actions/index';
import {REMOVE_FROM_FAVOURITE} from '../actions/index';
import {SET_SHOW_FAVOURITE} from '../actions/index';
import{ADD_SEARCH_RESULT} from '../actions/index';

const initialMovieState = {
list :[],
Favourites:[],
ShowFavourites:false
}
// if the state will be undefined we will be using the empty array, though it will never be undefined

// now we have changed the state from an array to an object so that it can have multiple arrays and 
export  function movies(state=initialMovieState,action){
    // we are not adding anything or removing anything from the state
    // we are not changing anything in the current array , we returning the new array 
    // and this new array will be merged with the current array in the STORE 
   // now checking the type of the action if it is same to actions or not
//     if (action.type===ADD_MOVIES) {
//         // the reducers always has to return state
//         return({
//             ...state,
//             list:action.movies
//         })
//     }
//     return state;
console.log('STATE REDUCER');
    switch (action.type) {
        case ADD_MOVIES:
        return{
        ...state,
        list: action.movies
        }
        case ADD_FAVOURITE:
        return{
        ...state,
        Favourites:[action.movie,...state.Favourites]
        }
        case REMOVE_FROM_FAVOURITE:{
         // we are using filter function here so that it will return the filtered/new array 
        const filteredArray = state.Favourites.filter(
        movie => movie.Title!== action.movie.Title
        );
        return{
        ...state,
        Favourites: filteredArray
        }
        }
        case SET_SHOW_FAVOURITE:{
        return{
            ...state,
            ShowFavourites:action.val

        }
        }
        case ADD_MOVIE_TO_LIST:{
            return{
                ...state,
                list:[action.movie,...state.list]
            }
        }
         default:
         return state
         
    }
 }

 // creating another reducer for the searching the movie 
 const initialSearchState = {
    result :{},
    showSearchResults:false
 }
export function search(state= initialSearchState,action) {
    console.log('SEARCH REDUCER');
    // ADD_SEARCH_RESULT
    switch (action.type) {
        case ADD_SEARCH_RESULT:
       return {
           ...state,
           result: action.movie,
           showSearchResults:true
        }
        case ADD_MOVIE_TO_LIST:{
            return{
            ...state,
            showSearchResults:false
            }
        }

        default: return state;
    }
}

// creating the root reducer to combine the states 
const initialRootState ={
// intialMovieState is defined above to combine it we are doing this 
    movies: initialMovieState,
    search: initialSearchState
}
// export  function rootReducer(state=initialRootState,action ) {
//     // this will return an object
//     return{
//     movies: movies(state.movies,action),
//     search: search(state.search,action)
//     }
    
// }
export default combineReducers({
// the combine reducers will cll the reducers internally just like root reducer function is calling 
movies:movies,
search:search 
});

    
    

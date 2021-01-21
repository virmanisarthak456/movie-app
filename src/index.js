import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './components/App';
//  now we have to pass the reducers to the store , therefore we are exporting it from the store
import rootReducer from './reducers'
import thunk from "redux-thunk";


// function(obj,next,action)
// the redux will cll this intenally as logger((obj)(next)(action))

// we are using currying function here as logger 


// const logger = function({dispatch,getState}) { // we can also write obj instead of {dispatch} and {getState}
//   return function (next) {
//     // here next will refer to the next middleware which we are getting from the redux (there can be N middle wares)
//     return function (action) {
//       // here we are writing our middleware code  
//       console.log('ACTION_TYPE=',action.type);
//       next(action);     
//     }
    
//   }
  
// }

const logger = ({dispatch,getState})=>(next)=>(action)=>{
// here we are writing our middleware code 

// if (typeof action !=='function') {
//   console.log('ACTION_TYPE=',action.type);
// }

next(action); 
}


// we dont need this function bcz we are installing the thunk(inbuilt in redux) and importing it here
// thunk is a middleare and its code looks like this only 

// const thunk =({dispatch,getState})=>(next)=>(action)=>{
//   // logger code
//   if (typeof action==='function') {
//     action(dispatch);
//     return;
//   }
//   next(action);
//   }


// creating the store used in redux 
// passing the reducer as an argument to the store 
// now passing the root reducer that is the combined reducer of movies and search
const store = createStore(rootReducer,applyMiddleware(logger,thunk));
// the reducer passes here as movies is declared in reducers at empty state of array <<state[]>>
console.log('store',store);

export const storeContext = createContext();
console.log('storeContext',storeContext);

// to get the state of the store 
console.log(' before-action-STATE',store.getState());

// now to dispatch the actions from the actions folder we can use store.dispatch 
// by calling the dispatch function, the actions will be passed to the reducers by REDUX automatically 

// store.dispatch({
// type:'ADD_MOVIES',
// movies:[{ name:"Superman"}]
// });

 console.log(' after-action-STATE',store.getState());


 class Provider extends React.Component{
   render(){
    const {store} = this.props;
    return(
    <storeContext.Provider value={store}>
      {/* we are passing this as children  */}
      {this.props.children}

    </storeContext.Provider>);
   }
 }

 
ReactDOM.render(
  <React.StrictMode>
    {/* passing the store as a prop to App.js so that we can render the movies from the store */}

    {/* now we are passing this store to every descender of App via context */}
    <Provider store={store}>
      {/* anythiing written in this will be passed as children to via provider */}
    <App/>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);



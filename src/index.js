import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import './CocktailList.css';
import './CocktailCard.css';
import './CocktailHome.css';
import './CocktailAddButton.css';
import './CocktailAddForm.css';
import './CocktailContainer.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as emailjs from 'emailjs-com'

ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>,
   document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

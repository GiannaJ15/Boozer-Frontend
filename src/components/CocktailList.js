import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class CocktailList extends Component {

  makeLink = (cocktail) => {
    return(
        <Link style={{ textDecoration: 'none' }} key ={cocktail.name} to= {`/cocktails/${cocktail.name}`}>
        <img alt = "cocktail Icon" className = "cocktailIcon" src="https://cdn4.iconfinder.com/data/icons/drinks-2/24/Martini-Glass-512.png"/>
        <li className = "listItem"> {cocktail.name.toUpperCase()}</li>
      </Link>
    )
  }


  render() {
    let cocktailLinks = this.props.cocktails.map(cocktail => this.makeLink(cocktail)
    )



    return (
      <div>
          <div className = "cocktailList">
            <Link to= '/cocktails' style={{ textDecoration: 'none' }}>
              <h2 className= "cocktailHeader" > My Cocktails </h2>
            </Link>
            <ul className="list">
            {cocktailLinks}
            </ul>
          </div>


      </div>
    )
  }

}

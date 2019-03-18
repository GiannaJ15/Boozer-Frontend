import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class CocktailList extends Component {

  makeLink = (cocktail) => {
    return(
        <Link style={{ textDecoration: 'none' }} key ={cocktail.name} to= {`/cocktails/${cocktail.name}`}>
        <img alt = "cocktail Icon" className = "cocktailIcon" src="https://i.pinimg.com/originals/a7/14/92/a71492d902476558960513154243f86b.png"/>
        <li className = "listItem"> {cocktail.name.toUpperCase()}</li>
      </Link>
    )
  }


  render() {
    let cocktailLinks = this.props.cocktails.map(cocktail => this.makeLink(cocktail)
    )



    return (
      <div className = "cocktailListContainer">
          <div className = "cocktailList">
            <Link to= '/cocktails' style={{ textDecoration: 'none' }}>
              <h2 className= "cocktailHeader" > #BoozeR# </h2>
                <img className = "boozerImage" alt = "pouring drink" src = 'https://i.gifer.com/3W0t.gif'/>
                <img className = "boozerImage" alt = "pouring drink" src = 'https://i.gifer.com/3W0t.gif'/>
                <img className = "boozerImage" alt = "pouring drink" src = 'https://i.gifer.com/3W0t.gif'/>
                <img className = "boozerImage" alt = "pouring drink" src = 'https://i.gifer.com/3W0t.gif'/>
                <img className = "boozerImage" alt = "pouring drink" src = 'https://i.gifer.com/3W0t.gif'/>
                <img className = "boozerImage" alt = "pouring drink" src = 'https://i.gifer.com/3W0t.gif'/>
            </Link>
            <ul className="list">
            {cocktailLinks}
            </ul>
          </div>


      </div>
    )
  }

}

import React, { Component } from 'react';
import {Redirect} from "react-router-dom"

export default class CocktailCard extends Component {

  state = {
    cocktail: null
  }

// Using Component Will Receive Props because we want the card to listen for a change in the cocktail passed, so that it can go to the cocktail's show page on the api and grab dat full cocktail info-- still using Component Did Mount bc we want that initial render

  componentDidMount () {
    if (this.props.cocktail) {
      this.fetchCocktail(this.props.cocktail)
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.cocktail !== newProps.cocktail) {
      this.fetchCocktail(newProps.cocktail)
    }
  }

  fetchCocktail = (cocktail) => {
    fetch(`http://localhost:3000/api/v1/cocktails/${cocktail.id}`)
      .then(resp => resp.json())
        .then((cocktail) => {
          this.setState({
            cocktail: cocktail
          })
        })
  }

  handleClick = (e) => {
    fetch(`http://localhost:3000/api/v1/cocktails/${e.target.dataset.id}`, {
      method: 'DELETE'
    })
// Wanna redirect to /cocktails
  }


  displayCocktailInfo = () => {

    return(
      <div>
        <h2 className= "cocktailName"> {this.state.cocktail.name.toUpperCase()} </h2>
        <h5 className= "cocktailDescription"> {this.state.cocktail.description} </h5>
        <h6> {this.state.cocktail.instructions} </h6>
        <h3> Ingredients </h3>
        <h5> <ul>
          {this.state.cocktail.proportions.map(proportion => {
            return (
              <li key = {proportion.ingredient_name}>
                {proportion.amount} {proportion.ingredient_name}
               </li>
            )
          })}
        </ul> </h5>
        <button onClick = {this.handleClick} data-id= {this.state.cocktail.id}> Delete Cocktail </button>
      </div>
    )
  }


//Making sure there is a cocktail state, before going ahead and doing shit with the cocktail state. so it doesn't freak out n throw errors
  render() {
    return(
      <div className = "cocktailCard">
        {
          this.state.cocktail && this.displayCocktailInfo()
        }
      </div>
    )
  }

}

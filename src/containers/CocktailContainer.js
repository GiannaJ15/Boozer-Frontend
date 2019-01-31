import React, { Component } from 'react';
import CocktailList from '../components/CocktailList';
import CocktailCard from '../components/CocktailCard'
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import AddButton from "./AddButton";
import NewCocktailForm from "../components/NewCocktailForm"


export default class CocktailContainer extends Component {

  state = {
    cocktails: [],
    fullCocktailObjs: [],
    displayForm: false,
    ingredients: [],
    cocktailProportions: [],
    newCocktail: null
  }

  // displayForm as a state so we know whether or not to render the form based on whether the cocktailAddBtn was clicked


  componentDidMount() {
    fetch('http://localhost:3000/api/v1/cocktails')
      .then(resp => resp.json())
        .then(cocktails =>
          this.alphabetizeAndSetState(cocktails)
          )
            .then(this.fetchIngredients)
                // .then(this.fetchFullCocktails)
  }


  fetchIngredients = () => {
    fetch('http://localhost:3000/api/v1/ingredients')
      .then(resp => resp.json())
        .then(ingredients => {
          this.setState({
            ingredients: ingredients
          })
        })
  }



  // fetchFullCocktails = () => {
  //   this.state.cocktails.map(cocktail => {
  //     fetch(`http://localhost:3000/api/v1/cocktails/${cocktail.id}`)
  //       .then(resp => resp.json())
  //         .then((cocktailObj) => {
  //           this.setState({
  //             fullCocktailObjs: [...this.state.fullCocktailObjs, cocktailObj]
  //           })
  //         })
  //     })
  // }


  alphabetizeAndSetState = (cocktails) => {
    let alphabetizedCocktails = cocktails.sort((a, b) => {
      if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1
      }
      else if (a > b) {
        return 1}
      else {
      return 0;
    }
    })
    this.setState({
      cocktails: alphabetizedCocktails
    })
  }


  addNewCocktail = (clicked) => {
      this.setState({
        displayForm: !this.state.displayForm
      })
  }

  createNewCocktail = (cocktailObj) => {
    fetch('http://localhost:3000/api/v1/cocktails/', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        name: cocktailObj.name,
        description: cocktailObj.description,
        instructions: cocktailObj.instructions,
        source: "Created By User"
      })
    })
      .then(resp => resp.json())
          .then((cocktailResponse) => {
            this.postIngredients(cocktailResponse, cocktailObj)
          })
  }

  postIngredients = (cocktailResponse, cocktailObj) => {
    let cocktailProportions = []
      cocktailObj.proportions.map(proportion => {
        let savedIngredient = this.state.ingredients.filter(ingredient => {
        return proportion.ingredient === ingredient.name
        })

        let obj = {}

        // if the ingredient does exist in our database already:
        if (savedIngredient.length !== 0){
          obj["ingredient"] = savedIngredient
          obj["amount"] = proportion.amount
        cocktailProportions.push(obj)
        }

        // if the ingredient is not in our database, we're going to post it there
        if (savedIngredient.length === 0) {
          fetch('http://localhost:3000/api/v1/ingredients', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
              name: proportion.ingredient
            })
          })
            .then(resp => resp.json())
              .then(ingredient => {
                let ingredientArray = []
                ingredientArray.push(ingredient)
                obj["ingredient"] = ingredientArray
                obj["amount"] = proportion.amount
                cocktailProportions.push(obj)
              })

            }
    })
    // setstate to CocktailProportions so that we can acess this array later
    this.setState({
      cocktailProportions: cocktailProportions
    }, () => this.postProportions(cocktailResponse))

  }


  postProportions = (cocktailResponse) => {
      this.state.cocktailProportions.map(proportion => {
        console.log(proportion, proportion.amount, cocktailResponse.id, proportion.ingredient[0].id)
        return (
          fetch('http://localhost:3000/api/v1/proportions', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
              amount: proportion.amount,
              cocktail_id: cocktailResponse.id,
              ingredient_id: proportion.ingredient[0].id
            })
          })
          .then(resp => resp.json())
            .then(() => this.setState({
              cocktails: [...this.state.cocktails, cocktailResponse],
              // newCocktail: cocktailResponse
            }))
        )

      })

  }

  // setStateBack = () => {
  //   this.setState({
  //     newCocktail: null
  //   })
  // }




  render() {
      return (
        <div className = "cocktailContainer">
          <CocktailList cocktails = {this.state.cocktails}/>
          <Switch>

                  <Route
                    exact path= "/cocktails/:name"
                    render = {props => {

                        let cocktail = [...this.state.cocktails].filter(cocktail  => {
                        return cocktail.name === props.match.params.name
                        });

                        return(
                        <CocktailCard  cocktail = {cocktail[0]}/>

                        )}}
                    />



              <Route
                 path = "/cocktails/"
                render = {() => {
                  return (
                    <Home cocktails = {this.state.cocktails} />
                  )
                }}
                />


            </Switch>

            <AddButton addNewCocktail = {this.addNewCocktail}/>

            <div className = "newCocktailForm">
                {
                  this.state.displayForm && <NewCocktailForm createNewCocktail = {this.createNewCocktail}/>
                }
            </div>

        </div>
      )
  }

}

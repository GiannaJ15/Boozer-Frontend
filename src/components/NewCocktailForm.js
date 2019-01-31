import React, {Component} from 'react'
import { Link } from "react-router-dom";
import ProportionsInput from '../containers/ProportionsInput'

export default class NewCocktailForm extends Component {

  state = {
    name: "",
    description: "",
    instructions: "",
    proportions: [{
      ingredient: "",
      amount: ""
    }]
  }

// This function below is handling any change in the input field. Main takeaway: if the input changes we're handling are coming from the "ingredient " and the "amount" inputs, we're creating a copy of the array of our state's proportions, going into that array, and saying set the respective input fields with their respective values
  changeHandler = (e) => {
    if (["ingredient", "amount"].includes(e.target.name) ) {
     let proportions = [...this.state.proportions]

     proportions[e.target.dataset.id][e.target.name] = e.target.value

     this.setState({
       proportions: proportions
     })
   }
    else {
      this.setState({
        [e.target.name] : e.target.value
      })
    }

  }

// Adding the proportion that was just written to an array of proportions of the state while leaving space for another one to be added

  addProportion = (e) => {
    e.preventDefault()
    this.setState((prevState) => ({
      proportions: [...prevState.proportions, {ingredient: "", amount: ""}]
    }))
  }

  // handleSubmit --> send the whole state up to the CocktailContainer, cuz Daddy gotta deal w that

  handleSubmit = (e) => {
    e.preventDefault()
    let newCocktail = this.state
    this.props.createNewCocktail(newCocktail)

  }

  render(){

    let {name, description, instructions, proportions} = this.state

    return(
      <div>
        <form onSubmit = {this.handleSubmit}>
          Name: <input onChange = {this.changeHandler} type= "text" name= "name" value = {name} />

          Description: <input onChange = {this.changeHandler}  className= "textbox" type= "text" name= "description" value = {description} />

          Instructions: <input onChange = {this.changeHandler} className= "textbox" type= "text" name=  "instructions" value = {instructions} />

          Proportions:
          <br/>

            <ProportionsInput changeHandler = {this.changeHandler} proportions = {proportions} />

            <button onClick = {this.addProportion}>
                <img alt = "addCocktailProportion" className = "addCocktailProportion" src = "https://cdn4.iconfinder.com/data/icons/keynote-and-powerpoint-icons/256/Plus-512.png" />
              </button>
          <input type= "submit" value= "Submit"/>

          </form>
      </div>
    )
  }

}

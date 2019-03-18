import React, {Component} from 'react'

export default class AddButton extends Component {

  state = {
    clicked: false
  }

  clickHandler = () => {
    this.setState({
      clicked: !this.state.clicked
    }, this.props.addNewCocktail(this.state.clicked))

  }


  render() {
    return(
      <button className = "AddButton" onClick= {this.clickHandler}>
        <span>
          {
            !this.props.displayForm?
              <div>
                New Cocktail
              </div>
            :
              <div>
                Hide Form
              </div>
          }
          <img className= "buttonIcon" alt = "pouring drink" src= "https://cdn2.iconfinder.com/data/icons/large-svg-icons/512/drink_toast_vector_symbol-512.png"/>
        </span>
      </button>
  )
  }

}

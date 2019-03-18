import React, {Component} from 'react'
import '../Modal.css'
import * as emailjs from 'emailjs-com'

export default class Modal extends Component {

  state = {
    toEmail: "",
    fromName: "",
    toName: "",
    messageHtml: ""
    // cocktail: null
  }

  componentDidMount(){
    console.log(this.props.cocktail)
    let ingredientList = this.props.cocktail.proportions.map(proportion => {
     return `${proportion.amount} ${proportion.ingredient_name} \n`
    })
      this.setState({
        // cocktail: this.props.cocktail,
      messageHtml: `
       Cocktail: ${this.props.cocktail.name} \n
       Cocktail Description: ${this.props.cocktail.description} \n
       Cocktail Instructions: ${this.props.cocktail.instructions} \n
       Cocktail Ingredients: ${ingredientList}`
      })
  }

  hideModal = () => {
    this.props.hideModal()
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  submitHandler = (e) => {
    e.preventDefault()
    let template_params = {
      "to_email": this.state.toEmail,
      "from_name": this.state.fromName,
      "to_name": this.state.toName,
      "message_html": this.state.messageHtml
    }
    let service_id = "gmail";
    let template_id = "boozerapp";
    let user_id = process.env.REACT_APP_EMAILJS_USER_ID
    emailjs.send(service_id, template_id, template_params, user_id ).then(() => {
      this.props.hideModal()
    })
  }

  render() {

      return(
        <div className = "bg-modal">
          <div className = "modal-content">
            <button onClick = {this.hideModal}>
            Back
            </button>
            <br/>
            <br/>
            <br/>

            <form onSubmit = {this.submitHandler}>

            BoozeR Buddy's Email: <input onChange = {this.changeHandler} type= "text" name= "toEmail" value = {this.state.toEmail} />
            <br/>
            Your Name: <input onChange = {this.changeHandler} type= "text" name= "fromName" value = {this.state.fromName} />
            <br/>
            BoozeR Buddy's Name: <input onChange = {this.changeHandler} type= "text" name= "toName" value = {this.state.toName} />
            <br/>
            Message: <br/> <textarea onChange = {this.changeHandler} type= "text" name= "messageHtml" value = {this.state.messageHtml} />
            <br/>
            <input className = "sendButton" type = 'submit' value = 'Send Cocktail'/>
            </form>

          </div>
        </div>
      )
    }


}

import React, {Component} from 'react';
import AddButton from "./AddButton";
import { Link } from "react-router-dom";

export default class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      userLong: "",
      userLat: "",
      weather: "",
      temperature: "",
      sadCocktail: null,
      happyCocktail: null
    }
  }

  // Problem with putting it here: componentWillReceiveProps rerenders the component every time a new prop is received.. this component is getting rendered three times, then getting

// the reason i did this function was bc in componenet did mount don thvae access to props _._

  componentDidMount () {
    fetch('http://ip-api.com/json/')
      .then(resp => resp.json())
        .then(response => {
          this.setState({
            userLat: response.lat,
            userLong: response.lon
          })
        })
          .then(this.fetchWeather)
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.cocktails !== this.props.cocktails){
      fetch('http://ip-api.com/json/')
      .then(resp => resp.json())
        .then(response => {
          this.setState({
            userLat: response.lat,
            userLong: response.lon
          })
        })
          .then(this.fetchWeather)
        }
  }

  // componentWillReceiveProps() {
  //     fetch('http://ip-api.com/json/')
  //       .then(resp => resp.json())
  //         .then(response => {
  //           this.setState({
  //             userLat: response.lat,
  //             userLong: response.lon
  //           })
  //         })
  //           .then(this.fetchWeather)
  //   }


    fetchWeather = () => {
      console.log("state", this.state)
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.userLat}&lon=${this.state.userLong}&APPID=d35ef01ff2e6c622389f8553825100cd`)
        .then(resp => resp.json())
          .then((response) => {
            console.log(response)
            this.setState({
              weather: response.weather[0],
              temperature: response.main.temp
            })
          })
          .then( () => {


            let sadCocktails = this.props.cocktails.filter(cocktail => {
              return cocktail.description.includes("Whiskey")
            })

           let sadCocktail = sadCocktails[Math.floor(Math.random()*sadCocktails.length)]

           let happyCocktails = this.props.cocktails.filter(cocktail => {
             return cocktail.description.includes("beer")
           })

            let happyCocktail = happyCocktails[Math.floor(Math.random()*happyCocktails.length)]

            this.setState({
              sadCocktail: sadCocktail,
              happyCocktail: happyCocktail
            })

          })
    }


  // This function is supposed to reccomend drinks based on the weather. I was going to search through the drinks for the drinks containing dark liquor, light liquor, whatever, then put them in an array and on each div render a .random drink HOWEVER, the cocktailContainer currently only holds the skimpy version of the cocktail information. The cocktail card holds the hearty information on each cocktail-- ive tried to get the info from the cocktail card up to the cocktail container, except that means we'd have to render a cocktail card before we have acccess to that information.. ive also tried to fetch information on an individual cocktail directly from cocktail container by iterating through the state of cocktails, and making a fetch request to each cocktails show page then adding each cocktail to a state called "full cocktail objs" using the spread operator, so that the previos cocktail added would still be there. But, it came out messy.. so we're just going to do it by name
  // Sure this excludes SEVERAL cocktails, but whatever

  renderSwitch() {

    let weatherIcon = `http://openweathermap.org/img/w/${this.state.weather.icon}.png`
    let temperature = (Math.floor(((((this.state.temperature)-273.15)*(9/5)+32)))+ '°F')

    switch(this.state.weather.main) {
      case "Drizzle":
      case "Rain":
      case "Thunderstorm":
      case "Clouds":
        return (
          <div className = "weather">
            <img alt = {this.state.weather.main} src= {weatherIcon} />
            <h4> {temperature} </h4>
            Perfect weather to wallow in your misery.
            Why don't you drown your sorrows with a  <Link to= {`/cocktails/${this.state.sadCocktail.name}`}>{this.state.sadCocktail.name}</Link>
          </div>
        )

      case "Clear":
          return (
            <div className = "weather">
            <img alt = {this.state.weather.main} src= {weatherIcon} />
            <h4> {temperature} </h4>
            Clear skies! Relax a little with a  <Link to= {`/cocktails/${this.state.happyCocktail.name}`}>{this.state.happyCocktail.name}</Link>
            </div>
          )
          case "Snow":
            return (
              <div className = "weather">
                <img alt = {this.state.weather.main} src= {weatherIcon} />
                <h4> {temperature} </h4>
                Snow. Calm, yet solemn. Might I suggest a  <Link to= {`/cocktails/${this.state.sadCocktail.name}`}>{this.state.sadCocktail.name}</Link> to help with all that self-reflection.
              </div>
            )
    }
  }

  render () {
    console.log("STATE", this.state)
    return(
      <div className= "homepage">

          <br/>
          <br/>

          <div className = "drinkSuggestion">
            {this.props.cocktails.length > 0 && (this.state.sadCocktail || this.state.happyCocktail) && this.renderSwitch()}
          </div>

            <img className = "homeImage" alt = "drink" src = 'https://img.freepik.com/free-vector/vector-illustration-whiskey-glass_1441-40.jpg?size=338&ext=jpg'/>
          <AddButton displayForm = {this.props.displayForm} addNewCocktail = {this.props.addNewCocktail}/>

      </div>
    )
  }

}

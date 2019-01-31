import React from 'react';


const ProportionsInput = (props) => {

  return (

    props.proportions.map((val, index) => {
      return (
        <div key = {index}>

        Ingredient Name:
          <input
            onChange = {props.changeHandler}
            type = "text"
            name = "ingredient"
            data-id={index}
            value = {props.proportions[index].ingredient}
            />

        Quantity:
          <input
            onChange = {props.changeHandler}
            type = "text"
            name = "amount"
            data-id={index}
            value = {props.proportions[index].amount}
            />

        </div>
      )
    })

  )

}

export default ProportionsInput

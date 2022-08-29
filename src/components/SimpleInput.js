import { useRef, useState } from 'react'

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('')
  // 1st method using state
  // 2nd method is using ref and reading from input when we need it

  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value)
  }

  const formSubmissionHandler = (event) => {
    // default JS behavior if form is submitted with a button inside of a form an htpp req is sent to the server serving this website
    // if the req was sent it would cause the page to be reloaded which we don't want...would restart entire app .. lose state
    event.preventDefault()

    console.log(enteredName)
  }
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" onChange={nameInputChangeHandler} />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  )
}

export default SimpleInput

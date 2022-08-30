import { useState, useEffect } from 'react'

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('')
  // 1st method using state
  const [enteredNameTouched, setEnteredNameTouched] = useState(false) //whether user already did attempt to enter a name
  // const nameInputRef = useRef()
  // 2nd method is using ref and reading from input when we need it
  // const [formIsValid, setFormIsValid] = useState(false) // update this when a form input changes
  // don't need to use state for this or useEffect (overall form validitity)
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false)

  // we can derive this from enteredName state
  const enteredNameIsValid = enteredName.trim() !== ''
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched

  // Email validations - derive from enteredEmail state
  const enteredEmailIsValid = enteredEmail
    .trim()
    .split('')
    .some((char) => {
      if (char === '@') {
        return true
      }
      return false
    })

  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched

  let formIsValid = false

  // combine all dependencies and check if they are all valid, if they are set overall form to VALID
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true
  }
  // want to set overall form validity so we add validities as dependencies

  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value)
  }

  const emailInputChangeHandler = (e) => {
    setEnteredEmail(e.target.value)
  }

  const nameInputBlurHandler = (e) => {
    setEnteredNameTouched(true) // if input was focused then it was touched
  }

  const emailInputBlurHandler = (e) => {
    setEnteredEmailTouched(true)
  }

  const formSubmissionHandler = (event) => {
    // default JS behavior if form is submitted with a button inside of a form an htpp req is sent to the server serving this website
    // if the req was sent it would cause the page to be reloaded which we don't want...would restart entire app .. lose state
    event.preventDefault()

    setEnteredNameTouched(true) //if user submitted form they have confirmed their inputs
    setEnteredEmailTouched(true)

    // if name or email input is invalid stop
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return
    }

    console.log(enteredName)
    // refs are always object with a current property we can access which holds value assigned to the ref (pointer at input element)
    // we can access .value because input elements in JS ..object always have a value property
    // const enteredValue = nameInputRef.current.value
    // console.log(enteredValue)

    setEnteredName('') //reset the input field using state
    setEnteredNameTouched(false)
    setEnteredEmail('')
    setEnteredEmailTouched(false)
    // nameInputRef.current.value=''
    // technically can do same using ref but not good practice b/c you are modifying the DOM directly
    // React should be the only thing manipulating the DOM
  }

  const nameInputClasses = nameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control'

  const emailInputClasses = emailInputIsInvalid
    ? 'form-control invalid'
    : 'form-control'

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInvalid && (
          <p className="error-text">Email must not be empty and have @.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  )
}

export default SimpleInput

// import { useState, useEffect } from 'react'
import useInput from '../hooks/use-input'

const SimpleInput = (props) => {
  // using custom hook for managing name input, touch state, validity
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '')

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes('@'))

  // we can derive this from enteredName state
  // const enteredNameIsValid = enteredName.trim() !== ''
  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched

  let formIsValid = false

  // combine all dependencies and check if they are all valid, if they are set overall form to VALID
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true
  }
  // want to set overall form validity so we add validities as dependencies

  // const nameInputChangeHandler = (e) => {
  //   setEnteredName(e.target.value)
  // }

  const formSubmissionHandler = (event) => {
    // default JS behavior if form is submitted with a button inside of a form an htpp req is sent to the server serving this website
    // if the req was sent it would cause the page to be reloaded which we don't want...would restart entire app .. lose state
    event.preventDefault()

    // setEnteredNameTouched(true) //if user submitted form they have confirmed their inputs
    // setEnteredEmailTouched(true)

    // if name or email input is invalid stop
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return
    }

    console.log(enteredName)
    // refs are always object with a current property we can access which holds value assigned to the ref (pointer at input element)
    // we can access .value because input elements in JS ..object always have a value property
    // const enteredValue = nameInputRef.current.value
    // console.log(enteredValue)

    // setEnteredName('') //reset the input field using state
    // setEnteredNameTouched(false)
    resetNameInput()
    resetEmailInput()
  }

  const nameInputClasses = nameInputHasError
    ? 'form-control invalid'
    : 'form-control'

  const emailInputClasses = emailInputHasError
    ? 'form-control invalid'
    : 'form-control'

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
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

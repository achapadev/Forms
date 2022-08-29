import { useRef, useState } from 'react'

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('')
  // 1st method using state
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true)
  const nameInputRef = useRef()
  // 2nd method is using ref and reading from input when we need it

  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value)
  }

  const formSubmissionHandler = (event) => {
    // default JS behavior if form is submitted with a button inside of a form an htpp req is sent to the server serving this website
    // if the req was sent it would cause the page to be reloaded which we don't want...would restart entire app .. lose state
    event.preventDefault()

    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false)
      return
    }
    setEnteredNameIsValid(true)

    console.log(enteredName)
    // refs are always object with a current property we can access which holds value assigned to the ref (pointer at input element)
    // we can access .value because input elements in JS ..object always have a value property
    const enteredValue = nameInputRef.current.value
    console.log(enteredValue)

    setEnteredName('') //reset the input field using state
    // nameInputRef.current.value=''
    // technically can do same using ref but not good practice b/c you are modifying the DOM directly
    // React should be the only thing manipulating the DOM
  }

  const nameInputClasses = enteredNameIsValid
    ? 'form-control'
    : 'form-control invalid'
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
        {!enteredNameIsValid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  )
}

export default SimpleInput

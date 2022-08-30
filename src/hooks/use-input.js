import { useState } from 'react'

const useInput = (validateValue) => {
  // we want to manage value of a given input, touched state, infer its validity
  // flexible - concrete validation logic should be passed in from the outside
  const [enteredValue, setEnteredValue] = useState('')
  const [isTouched, setIsTouched] = useState(false) //whether user already did attempt to enter a name

  // we can derive this from enteredName state
  const valueIsValid = validateValue(enteredValue)
  const hasError = !valueIsValid && isTouched

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value)
  }

  const inputBlurHandler = (e) => {
    setIsTouched(true) // if input was focused then it was touched
  }

  const reset = () => {
    setEnteredValue('')
    setIsTouched(false)
  }

  //   functions being returned can be called from components that use this hook

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  }
}

export default useInput

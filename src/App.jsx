import { useState } from 'react'
import './App.css'

function App() {
  const [currentInput, setCurrentInput] = useState("")
  const [previousValue, setPreviousValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [lastResult, setLastResult] = useState(null)
  const [error, setError] = useState(null)
  const [lastEq, setLastEq] = useState(null)
  
  function appendNumber(number) {
    if(number === "." && currentInput.includes(".")){
      return
    }
    if(currentInput === "0" && number === "0"){
      return
    }
    setCurrentInput(prev => prev + number)
    setLastEq(null)
  }

  function clearAll(){
    setCurrentInput("")
    setPreviousValue(null)
    setOperator(null)
    setLastResult(null)
    setError(null)
    setLastEq(null)
  }

  function chooseOperator(operator){
    
    if(currentInput === "" && previousValue !== null){
      setOperator(operator)
      return
    }

    if(lastEq && currentInput !== ""){
      setPreviousValue(Number(currentInput))
      setOperator(operator)
      setLastEq(null)
      setCurrentInput("")
      return
    }
    
    if(currentInput == null || currentInput === ""){
      return
    }
    
    setLastEq(null)
    setOperator(operator)
    setPreviousValue(Number(currentInput))
    setCurrentInput("")
  }

  function invertValue(){
    if(currentInput === "" || currentInput === "0") {return}
    setCurrentInput(prev => (Number(prev) * -1).toString())
  }

  function validate(){
    if(operator === "/" && currentInput === "0") { 
      alert("Cannot divide by zero")
      clearAll()
      setError("Syntax Error")
      return false
    }
    return true
  }

  function calculate(){
    let result;

    if(!validate()){
      return
    }
    switch(operator){
      case "+":
        result = previousValue + Number(currentInput)
        break;
      case "-":
        result = previousValue - Number(currentInput)
        break;
      case "*":
        result = previousValue * Number(currentInput)
        break;
      case "/":
        result = previousValue / Number(currentInput)
        break;
      default:
          return
    }
    setLastEq(`${previousValue} ${operator} ${currentInput}`)
    setLastResult(result)
    setCurrentInput(result.toString()) // to render in display the result and not change var to display
    setOperator(null)
    setPreviousValue(null)
  }


  return (
    <>
    <div className="app">
      <div className="equation">
        { lastEq ? lastEq : "" } 
        {lastEq ? "" : (previousValue ? previousValue : "")}
        {lastEq ? "" : (operator ? operator : "")}
        {lastEq ? "" : (currentInput ? currentInput : "")}
      </div>

      <div className="display">
        {error || currentInput || "0"}
      </div>

      <button onClick={() => clearAll()} className="clear">C</button>
      <button onClick={() => invertValue()}>+/-</button>
      <button onClick={() => lastResult != null && appendNumber(lastResult)}>ANS</button>
      <button onClick={() => chooseOperator("/")} className="operator">÷</button>

      <button onClick={() => appendNumber("1")}>1</button>
      <button onClick={() => appendNumber("2")}>2</button>
      <button onClick={() => appendNumber("3")}>3</button>
      <button onClick={() => chooseOperator("*")} className="operator">×</button>

      <button onClick={() => appendNumber("4")}>4</button>
      <button onClick={() => appendNumber("5")}>5</button>
      <button onClick={() => appendNumber("6")}>6</button>
      <button onClick={() => chooseOperator("-")} className="operator">−</button>

      <button onClick={() => appendNumber("7")}>7</button>
      <button onClick={() => appendNumber("8")}>8</button>
      <button onClick={() => appendNumber("9")}>9</button>
      <button onClick={() => chooseOperator("+")} className="operator">+</button>

      <button onClick={() => appendNumber("0")} className="zero">0</button>
      <button onClick={() => appendNumber(".")}>.</button>
      <button onClick={() => calculate()} className="equals">=</button>

    </div>
    </>
  )
}

export default App

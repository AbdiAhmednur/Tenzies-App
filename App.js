import './App.css';
import Die from './Die';
import React, { useEffect, useState } from 'react';
import {nanoid} from "nanoid";



function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [Tenzies, setTenzies]  = React.useState(false)

  React.useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld) 
    const firstValue = dice[0].value 
    const allSameValue = dice.every (die => die.value === firstValue)
    if (allHeld && allSameValue){
      setTenzies(true)
      console.log("Well done you won")
    }


  }, [dice]) 
  
  
  function generateNewDie(){
    return {
      value: Math.ceil(Math.random()*6), 
      isHeld: false,
      id: nanoid()
    };
  }
  


  function allNewDice() {
    const newDice =[]
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice;
  }


   function rollDice() {

    if (!Tenzies) {
      setDice(oldDice => oldDice.map(die => {
      
        return die.isHeld ? 
        die : 
        generateNewDie()

    }))

    } else {
      setTenzies(false)
      setDice(allNewDice())
    }

   }
   
   function holdDice(id){
     setDice(oldDice => oldDice.map(die =>{
      return die.id === id ? {...die, isHeld: !die.held} : 
      die


     }))
   }


  
  const diceElements = dice.map(die =>  <Die key={die.id} value={die.value}  isHeld={die.isHeld}  holdDice={() => holdDice(die.id)} />)
  
  return (
     <div>

<h1 className='title'>Tenzies</h1>
<p className='instructions'> Roll until all dice are the same. Click each dice
to freeze it at its current value between rolls. </p>
   <br />
    <div className='dice-container'>
     {diceElements}
    </div>

    < br />

    <button className='roll-dice' onClick={rollDice}> {Tenzies? "New Game" : "Roll"}  </button>
    </div>
  );
}

export default App;

// look into CSS-in-JS
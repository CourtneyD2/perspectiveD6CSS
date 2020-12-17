import React, { Component } from 'react'
import Dice from './Dice'
const maxDice = 12;
class DiceRoller extends Component{
  constructor(props){
    super(props);
    this.rollDice = this.rollDice.bind(this);
    this.adjustDice =this.adjustDice.bind(this);
    this.state ={rolling: false, rolls:[1,1], numDice: 2};
  }

  getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }

  rollDice(e) {
   const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach(die => {
      this.toggleClasses(die);
     });
     this.setState(
      function (st) {
        let newVal = [];
        for (var i=0;i<=this.state.rolls.length-1;i++){newVal[i] = this.getRandomNumber(1,6);} //default value if no changes always go to first scree
        return ({rolling: true, rolls: newVal})
      }
    );
    setTimeout(()=> this.setState({rolling:false}),1750);    
    
  }
  adjustDice(e){
    let x =  parseInt(e.target.value);
    let num = this.state.numDice;
    let GoLower = (x<0 && (this.state.numDice <= maxDice && this.state.numDice>1)); //determine if decrementing and can do so
    let GoHigher = (x>0&& (this.state.numDice >=1 && this.state.numDice<(maxDice)));//determine if increment and can do so    
    this.setState(
      function (st) {
        let newVal = 1;
        let br =[];
        if (GoHigher || GoLower){newVal = st.numDice + x} 
        else if (x<0 && this.state.numDice === 1){newVal =maxDice}
        for (var i=0;i<=newVal-1;i++){br[i] = 1;}
        return ({numDice: newVal, rolls: br})
      }
    );
  }
  

  render(){
    return(
      <div className="rollDice">
        <div>
          <button type="button" className="roll-button" onClick={this.rollDice} disabled={this.state.rolling}>
            {(this.state.rolling) ? "Rolling .." : "Roll Dice"}
          </button>
          <button type="button" className="roll-button" onClick={this.adjustDice} value={1} disabled={this.state.rolling}>More Dice</button>
          <button type="button" className="roll-button" onClick={this.adjustDice} value={-1} disabled={this.state.rolling}>Less Dice</button>
        </div>
      <div className="dice">
        {this.state.rolls.map((item, index) => <Dice roll={item} />)}   
      </div>
    </div>
    );
  }
}

export default DiceRoller;
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function standardDeck() {
  function createDeckMap(deck) {
    let tempDeck = [];
  
    deck.value.forEach((val) => {               
      deck.suit.forEach((s) => {
        tempDeck.push( {
            suit:s,
            value:val,
            color: s === 'spade' || s === 'clubs' ? 'black':'red'
        })
      })
    })
  
    return tempDeck;
  }

  var deck = {
    suit:['spade','clubs','diamond','heart'],
    value:['A','2','3','4','5','6','7','8','9','10','J','Q','K']
  }
  
  return createDeckMap(deck);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function RenderCard(props) {
  
  function convertToUniEntity(suit) {
    var entity = 0;
    switch (suit) {
      case 'spade': {
        entity = '\u2660' 
        break;
      }
      case 'clubs': {
        entity = '\u2663';
        break;
      } 
      case 'heart': {
        entity = '\u2661';
        break;
      }
      default: {
        entity = '\u2662';
      }
    }
    return entity;
  }


  var suit = convertToUniEntity(props.suit),
      cardStyle = 'card card-' + props.colour;
  return (
      <div className={cardStyle}>
        <span className="card-suit card-suit-top">{suit}</span> 
          <span className="card-number">{props.value}</span>   
        <span className="card-suit card-suit-bottom">{suit}</span>
      </div>
  )
}

function ButtonControls(props) {  
    return (
      <span>
        <button className="shuffle" onClick={props.shuffle}>Shuffle</button>
        <button className="reset" onClick={props.reset}>Reset</button>
      </span>
    )
}

class Cards extends React.Component {
    render() {          
      return (         
         this.props.deck.map((card) => {                         
          return ( 
              <RenderCard 
                key={card.value + '' + card.suit} 
                suit={card.suit} 
                colour={card.color} 
                value={card.value}/> 
          )          
      }))
    }


}

class App extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      deck: standardDeck()
    };
    this.shuffle = this.shuffle.bind(this); 
    this.reset = this.reset.bind(this); 
  }
  

  shuffle() {
    var deck = this.state.deck,
        tempDeck = deck.slice(),
        max = 51;
    // pick a random number between 0 - 51, check if the index exists, use it if does 
    for (var i = 0; i <= max; i++) {
      var randInt = getRandomIntInclusive(0,max-i);        
      tempDeck[i] = deck[randInt];
      deck.splice(randInt,1);                    
    }
          
    this.setState({      
      deck: tempDeck
    })
    
  } 

  reset() {
    // Remove the shuffled deck
    this.setState({
      deck: standardDeck()
    })

  }

  // Move deck rendering up here
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Shuffle cards</h1>
        </header>        
        <div className="card-controller">
          <ButtonControls shuffle={this.shuffle} reset={this.reset}/>
        </div>
        <div className="cards-section">        
          <Cards deck={this.state.deck}/>
        </div>
      </div>
    );
  }
}

export default App;

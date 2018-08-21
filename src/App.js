import React, { Component } from 'react';
import './App.css';
import FlipMove from 'react-flip-move';


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

function ButtonControls(props) {  
    return (      
      <div className="card-controller">
        <button className="shuffle" onClick={props.shuffle}>Shuffle</button>
        <button className="reset" onClick={props.reset}>Reset</button>      
      </div>
    )
}

class RenderCard extends React.Component {
  constructor(props){
    super(props);
    this.suit = this.convertToUniEntity(props.suit)
    this.cardStyle = 'card card-' + props.colour;
  }
  convertToUniEntity(suit) {
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

  render() {
    return (
      <div key={this.props.key} className={this.cardStyle}>
        <span className="card-suit card-suit-top">{this.suit}</span> 
          <span className="card-number">{this.props.value}</span>   
        <span className="card-suit card-suit-bottom">{this.suit}</span>
      </div>
    )
  }
}

class Cards extends React.Component {   
    render() {          
      return (       
        <FlipMove className="cards-section"      
        staggerDurationBy={20}
        staggerDelayBy={20}>          
         {this.props.deck.map((card) => {                         
          return (                   
              <RenderCard 
                key={card.value + '' + card.suit} 
                suit={card.suit} 
                colour={card.color} 
                value={card.value}                
                />                                                                    
          )           
                   
      })}
      </FlipMove>       
      )
    }


}

class App extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      deck: standardDeck(),
      updated: false
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
          <h1 className="App-title">Shuffle cards</h1>
        </header>
        <div className="body-section">
          <ButtonControls shuffle={this.shuffle} reset={this.reset}/>                                   
          <Cards deck={this.state.deck} />                               
        </div>                
      </div>
    );
  }
}

export default App;

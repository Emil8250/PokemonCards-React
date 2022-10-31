import React, { useState } from 'react';
import './App.css';
import {DelayInput} from 'react-delay-input';
import pokemon from 'pokemontcgsdk'

pokemon.configure({ apiKey: 'ee4d4085-9702-4e4b-abaa-d6f970c3594f' })
function App() {
  let [counter, setCounter] = useState(2);
  let handleClick = (incrementValue) => setCounter(counter + incrementValue);
  return (
    <div className="App">
      <header className="App-header">
        <div id="counter">
          <div className="grid-container">
            <Form />
            <Button handleClickFunc={handleClick} increment={8} />
            <Button handleClickFunc={handleClick} increment={4} />
            <Button handleClickFunc={handleClick} increment={2} />
            <Display message={counter} />
          </div>
        </div>
      </header>
    </div>
  );
}

function Button(props) {
  const handleClick = () => props.handleClickFunc(props.increment)
  return (<button onClick={handleClick}>
    +{props.increment}
  </button>)
}

function Display(props) {
  return (
    <div className="display">{props.message}</div>
  );
}

class Form extends React.Component {
  pokemonNameInput = React.createRef();
  pokemons = pokemon.card.where({q: "set.id:base1" })
  handleChange = async() => {
    let pokemonss = await this.pokemons;
    const result = Object.values(pokemonss.data);
    let currentMon = result.find(({name}) => name.toLowerCase().match(`${this.pokemonNameInput.current.value.toLowerCase()}*`));
    if(currentMon != null)
      console.log(currentMon);
  };
  render() {
    return (
      <div>
        <DelayInput 
          placeholder="Pokemon"
          delayTimeout={800}
          onChange={this.handleChange}
          inputRef={this.pokemonNameInput}/>
       
      </div>
    );
  }
}

export default App;

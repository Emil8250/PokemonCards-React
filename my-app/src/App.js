import React, { useState } from 'react';
import './App.css';
import { DelayInput } from 'react-delay-input';
import pokemon from 'pokemontcgsdk'

pokemon.configure({ apiKey: 'ecf27079b-2658-4a36-b8d8-e779ae9581c2' })
function App() {
  let [mon, setCurrentMon] = useState("");
  let handleUpdate = (monValue) => setCurrentMon(monValue);
  return (
    <div className="App">
      <Form handleChangeFunc={handleUpdate}/>
      <Container currentMon={mon} />
    </div>
  );
}

function Container(props) {
  return (
    <div className='Container'>
      <h3 className='title'>{props?.currentMon?.name}</h3>
      <p className='bodyText'>Rarity: {props?.currentMon?.rarity}</p>
      <p className='bodyText'>Average Sell Price: {props?.currentMon?.cardmarket?.prices?.averageSellPrice}$</p>
      <img className='cardImage' src={props?.currentMon?.images?.small} />
    </div>
  );
}

class Form extends React.Component {
  pokemonNameInput = React.createRef();
  pokemons = pokemon.card.where({ q: "set.id:base1" })
  handleChange = async () => {
    let pokemonss = await this.pokemons;
    const result = Object.values(pokemonss.data);
    let currentMon = "";
    if(this?.pokemonNameInput?.current?.value?.toLowerCase() != "")
      currentMon = result?.find(({ name }) => name?.toLowerCase()?.match(`${this?.pokemonNameInput?.current?.value?.toLowerCase()}*`));
    this.props.handleChangeFunc(currentMon);
  };
  render() {
    return (
      <div>
        <DelayInput
          className="pokemonInput"
          placeholder="Pokemon"
          delayTimeout={300}
          onChange={this.handleChange}
          inputRef={this.pokemonNameInput} />

      </div>
    );
  }
}

export default App;

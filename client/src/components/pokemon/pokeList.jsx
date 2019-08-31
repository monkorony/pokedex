import React, { Component } from "react";
import PokeCard from "./pokeCard";

class PokeList extends Component {
  render() {
    const {
      searchString,
      handleSubmit,
      handleChange,
      pokemon,
      handleInputChange,
      error
    } = this.props;

    return (
      <React.Fragment>
        {pokemon && !error ? (
          pokemon.map(pokemon => (
            <PokeCard
              name={pokemon.name}
              url={pokemon.url}
              key={pokemon.name}
            />
          ))
        ) : (
          <h1>Pokemon cannot be found</h1>
        )}
      </React.Fragment>
    );
  }
}

export default PokeList;

import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const POKEMONS_QUERY = gql`
  query PokemonsQuery {
    getAllPokemon {
      results {
        name
        url
      }
    }
  }
`;

class Pokemons extends Component {
  render() {
    return (
      <div>
        <h2>Pokemons</h2>
        <ul className="new">
          <Query query={POKEMONS_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              return data.getAllPokemon.results.map(pokemon => (
                <li key={pokemon.name}>
                  <p>{pokemon.name}</p>
                </li>
              ));
            }}
          </Query>
        </ul>
      </div>
    );
  }
}

export default Pokemons;

import React, { Component, Fragment } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';


const POKEMON_QUERY = gql`
query PokemonQuery($id: Int!) {
  getPokemonById(id: $id) {
    id
    name
    height
  }
}
`;

class PokemonSingle extends Component {
  render() {
    let { pokemonId } = { pokemonId: 1 };
    return (
      <Fragment >
        <Query query={POKEMON_QUERY} variables={{ pokemonId }}>
          {
            ({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>
              if (error) console.log(error)
              console.log(data, 'pokemon data');
            }
          }
        </Query>
      </Fragment>
    );
  }
}

export default PokemonSingle;
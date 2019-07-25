const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLID,
  GraphQLSchema
} = require('graphql');

//Pokemons
const Pokemons = new GraphQLObjectType({
  name: 'Pokemons',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    url: { type: GraphQLString }
  })
})

//Pokemon
const Pokemon = new GraphQLObjectType({
  name: 'Pokemon',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    height: { type: GraphQLInt },
    weight: { type: GraphQLInt },
    types: {
      type: { type: new GraphQLObjectType(PokemonType) }
    }

  })
})

//Pokemon type
const PokemonType = new GraphQLObjectType({
  name: 'PokemonType',
  fields: () => ({
    name: { type: GraphQLString },
    url: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    pokemons: {
      type: new GraphQLList(Pokemons),
      resolve(parent, args) {
        return axios.get('https://pokeapi.co/api/v2/pokemon/')
          .then(res => res.data.results);
      }
    },
    pokemon: {
      type: Pokemon,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios.get(`https://pokeapi.co/api/v2/pokemon/${args.id}`)
          .then(res => res.data);
      }
    },
    pokemonType: {
      type: PokemonType,

    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
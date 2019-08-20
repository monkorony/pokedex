import React, { Component } from 'react';
import axios from 'axios';
import pokemonGroup from './pokemon/pokemonGroup.png';
import PokeList from './pokemon/pokeList';
import PokeSearchInput from './pokemon/pokeSearch';

//
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';


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
export default class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      updateUrl: 'https://pokeapi.co/api/v2/pokemon/',
      url: "https://pokeapi.co/api/v2/pokemon/",
      pokemon: null,
      searchString: '',
      error: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }


  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data['results'] })
    //console.dir(res, { depth: null, color: true });
  }

  handleChange = (e) => {
    this.setState({ searchString: e.target.value.toLowerCase() });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })

  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { searchString, updateUrl } = this.state
    this.setState(() => {
      return { url: `${updateUrl}${searchString}`, searchString: '' }
    }, async () => {
      try {
        const res = await axios.get(this.state.url);
        console.log(res.data, 'res data');
        this.setState({
          pokemon: [
            {
              name: res.data.name,
              url: `https://pokeapi.co/api/v2/pokemon/${res.data.id}/`,
              index: res.data.id,
            }
          ],
          error: false
        })
      } catch (error) {
        this.setState({
          error: true
        })
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal">The Pokedex</h1>
            <p className="lead font-weight-normal">Search for your favorite pokemon</p>
            <PokeSearchInput handleChange={this.handleChange} handleSubmit={this.handleSubmit} searchString={this.searchString} handleInputChange={this.handleInputChange} />
          </div>
          <div className=""><img style={{ maxWidth: '100%' }} src={pokemonGroup} /></div>
        </div>
        <div className="py-5 album">
          <div className="container">
            <div className="row">
              <Query query={POKEMONS_QUERY}>
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error :(</p>;
                  return <PokeList
                    searchString={this.state.searchString}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    pokemon={data.getAllPokemon.results}
                    handleInputChange={this.handleInputChange}
                    error={this.state.error}
                  />
                }}
              </Query>
            </div>
          </div>
        </div>
      </React.Fragment>

    )
  }
}

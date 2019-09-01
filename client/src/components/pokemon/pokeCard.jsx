import React, { Component } from "react";
import spinner from "../images/charmeleonLoad.gif";
import {
  capitalizeFirstLetter,
  lpad,
  typeColors
} from "../../services/pokemonService";
import axios from "axios";
import { Link } from "react-router-dom";

export default class PokeCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokeIndex: "",
    type: [],
    imageLoading: true,
    tooManyRequests: false
  };

  async componentDidMount() {
    const { name, url } = this.props;
    //console.log(url, 'url')
    const pokeIndex = url.split("/")[url.split("/").length - 2];
    //console.log(pokeIndex, 'pokeIndex')
    const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${lpad(
      pokeIndex,
      3
    )}.png`;
    const pokeType = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokeIndex}`
    );
    //console.log(pokeType.data.types, "types");
    this.setState({ name, imageUrl, pokeIndex, type: pokeType.data.types });
  }

  pad(number, length) {
    var str = "" + number;
    while (str.length < length) {
      str = "0" + str;
    }
    return str;
  }
  render() {
    const { imageUrl, imageLoading } = this.state;

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
      <div className="col-md-3 co-sm-6 mb-5">
        <div className="card mb-4 box-shadow">
          {/* <div className="card-header"><h5 style={{ textAlign: 'center', marginBottom: '0' }}>{capitalizeFirstLetter(name)}</h5></div> */}
          {imageLoading ? (
            <React.Fragment>
              <img
                src={spinner}
                className="card-img-top"
                style={{ backgroundColor: "#84d6f7", borderRadius: "none" }}
              />
            </React.Fragment>
          ) : null}
          <img
            className="card-img-top mx-auto"
            src={imageUrl}
            alt="Pokemon"
            onLoad={() => this.setState({ imageLoading: false })}
            onError={() => this.setState({ tooManyRequests: true })}
            style={
              imageLoading
                ? { display: "none" }
                : {
                    backgroundColor: "#84d6f7",
                    border: "0",
                    display: "block"
                  }
            }
          />

          <div className="card-body">
            <Link to={`/pokemons/${this.state.pokeIndex}`}>
              <h5>{capitalizeFirstLetter(this.props.name)}</h5>
            </Link>
            <ul>
              {this.state.type.map(pokemonType => {
                return (
                  <li
                    style={{
                      backgroundColor: `${typeColors[pokemonType.type.name]}`
                    }}
                    key={Math.random()}
                  >
                    <Link
                      to={`/types/${pokemonType.type.name}`}
                      style={{
                        color: `#fff`
                      }}
                    >
                      {capitalizeFirstLetter(pokemonType.type.name)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

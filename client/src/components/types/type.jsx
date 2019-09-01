import React, { Component } from "react";
import PokeCard from "../pokemon/pokeCard";
import {
  capitalizeFirstLetter,
  lpad,
  typeColors
} from "../../services/pokemonService";
import { Link } from "react-router-dom";

import axios from "axios";

class Type extends Component {
  constructor() {
    super();
  }
  state = {
    id: "",
    double_damage_from: [],
    double_damage_to: [],
    half_damage_from: [],
    half_damage_to: [],
    no_damage_from: [],
    no_damage_to: [],
    moves: [],
    name: "",
    pokemon: []
  };

  async componentDidMount() {
    const { typeName } = this.props.match.params;
    let typeInfo = await axios.get(
      `https://pokeapi.co/api/v2/type/${typeName}`
    );
    const {
      id,
      damage_relations: { double_damage_from },
      damage_relations: { double_damage_to },
      damage_relations: { half_damage_from },
      damage_relations: { half_damage_to },
      damage_relations: { no_damage_from },
      damage_relations: { no_damage_to },
      moves,
      name,
      pokemon
    } = typeInfo.data;
    this.setState({
      id,
      double_damage_from,
      double_damage_to,
      half_damage_from,
      half_damage_to,
      no_damage_from,
      no_damage_to,
      moves,
      name,
      pokemon
    });
  }

  async fetchTypeData(typeName) {
    let typeInfo = await axios.get(
      `https://pokeapi.co/api/v2/type/${typeName}`
    );
    console.log(typeInfo.data, "typeinfo data");
    const {
      id,
      damage_relations: { double_damage_from },
      damage_relations: { double_damage_to },
      damage_relations: { half_damage_from },
      damage_relations: { half_damage_to },
      damage_relations: { no_damage_from },
      damage_relations: { no_damage_to },
      moves,
      name,
      pokemon
    } = typeInfo.data;
    console.log(this.state, "this state");
    this.setState({
      id,
      double_damage_from,
      double_damage_to,
      half_damage_from,
      half_damage_to,
      no_damage_from,
      no_damage_to,
      moves,
      name,
      pokemon
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.typeName !== prevProps.match.params.typeName) {
      this.fetchTypeData(this.props.match.params.typeName);
    }
  }
  render() {
    const {
      id,
      double_damage_from,
      double_damage_to,
      half_damage_from,
      half_damage_to,
      no_damage_from,
      no_damage_to,
      moves,
      name,
      pokemon
    } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="col">
              <div className="card cardType">
                <div
                  style={{
                    backgroundColor: `${typeColors[name]}`
                  }}
                  className="card-header"
                >
                  <div className="row">
                    <div className="col-12">
                      <h3 style={{ color: "#fff" }}>
                        {capitalizeFirstLetter(name)}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h2>Double Damage From:</h2>
                      <ul>
                        {double_damage_from.map(ddFrom => {
                          return (
                            <li
                              style={{
                                backgroundColor: `${typeColors[ddFrom.name]}`,
                                color: "#fff"
                              }}
                              key={Math.random()}
                            >
                              {capitalizeFirstLetter(ddFrom.name)}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h2>Double Damage To:</h2>
                      <ul>
                        {double_damage_to.map(ddTo => {
                          return (
                            <li
                              style={{
                                backgroundColor: `${typeColors[ddTo.name]}`,
                                color: "#fff"
                              }}
                              key={Math.random()}
                            >
                              <Link
                                to={`/types/${ddTo.name}`}
                                style={{
                                  color: "#fff"
                                }}
                              >
                                {capitalizeFirstLetter(ddTo.name)}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h2>Half Damage From:</h2>
                      <ul>
                        {half_damage_from.map(hdFrom => {
                          return (
                            <li
                              style={{
                                backgroundColor: `${typeColors[hdFrom.name]}`,
                                color: "#fff"
                              }}
                              key={Math.random()}
                            >
                              <Link
                                to={`/types/${hdFrom.name}`}
                                style={{
                                  color: "#fff"
                                }}
                              >
                                {capitalizeFirstLetter(hdFrom.name)}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h2>Half Damage To:</h2>
                      <ul>
                        {half_damage_to.map(hdTo => {
                          return (
                            <li
                              style={{
                                backgroundColor: `${typeColors[hdTo.name]}`,
                                color: "#fff"
                              }}
                              key={Math.random()}
                            >
                              <Link
                                to={`/types/${hdTo.name}`}
                                style={{
                                  color: "#fff"
                                }}
                              >
                                {capitalizeFirstLetter(hdTo.name)}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h2>No Damage From:</h2>
                      <ul>
                        {no_damage_from.map(ndFrom => {
                          return (
                            <li
                              style={{
                                backgroundColor: `${typeColors[ndFrom.name]}`,
                                color: "#fff"
                              }}
                              key={Math.random()}
                            >
                              <Link
                                to={`/types/${ndFrom.name}`}
                                onClick={this.forceUpdate}
                                style={{
                                  color: "#fff"
                                }}
                              >
                                {capitalizeFirstLetter(ndFrom.name)}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h2>No Damage To:</h2>
                      <ul>
                        {no_damage_to.map(ndTo => {
                          return (
                            <li
                              style={{
                                backgroundColor: `${typeColors[ndTo.name]}`,
                                color: "#fff"
                              }}
                              key={Math.random()}
                            >
                              <Link
                                to={`/types/${ndTo.name}`}
                                style={{
                                  color: "#fff"
                                }}
                              >
                                {capitalizeFirstLetter(ndTo.name)}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-12">
                      <h2>Moves:</h2>
                      <ul>
                        {moves.map(move => {
                          return (
                            <li
                              key={Math.random()}
                              style={{
                                color: "#343a40",
                                backgroundColor: "#eee",
                                margin: "5px"
                              }}
                            >
                              {capitalizeFirstLetter(move.name)}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" style={{ marginBottom: "40px" }}>
            <h2>{capitalizeFirstLetter(name)} Type Pokemon</h2>
          </div>
          {pokemon.map(pokemon => (
            <PokeCard
              name={pokemon.pokemon.name}
              url={pokemon.pokemon.url}
              key={pokemon.pokemon.name}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Type;

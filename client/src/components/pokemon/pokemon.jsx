import React, { Component } from "react";
import { capitalizeFirstLetter, lpad } from "../../services/pokemonService";
import axios from "axios";

export default class Pokemon extends Component {
  state = {
    name: "",
    pokeIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: ""
    },
    height: "",
    weight: "",
    eggGroup: "",
    abilities: "",
    genderRatioMale: "",
    genderRatioFemale: "",
    evs: "",
    hatchSteps: ""
  };

  async componentDidMount() {
    let { pokemonIndex } = this.props.match.params;
    //Urls for pokemon informaion
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`;

    //get pokemon info
    const pokemonRes = await axios.get(pokemonUrl);

    const name = pokemonRes.data.name;
    const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${lpad(
      pokemonIndex,
      3
    )}.png`;
    const { data } = pokemonRes;

    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    data.stats.map(stat => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
      }
    });

    //conver decimeters to feet
    const height = Math.round((data.height * 0.328084 + 0.0001) * 100) / 100;
    //convert hectograms to pounds
    const weight = Math.round((data.weight * 0.220464 + 0.0001) * 100) / 100;

    //types
    const types = data.types.map(type => {
      return type.type.name;
    });

    //abilities
    const abilities = data.abilities.map(ability => {
      return ability.ability.name
        .split("-")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
    });

    //evs
    const evs = data.stats
      .filter(stat => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map(stat => {
        return `${stat.effort} ${stat.stat.name
          .toLowerCase()
          .split("-")
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")}`;
      })
      .join(", ");

    //get pokemon description, catch rate, egg groups, gender ration, hatch steps
    await axios.get(pokemonSpeciesUrl).then(res => {
      let description = "";
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name == "en") {
          description = flavor.flavor_text;
          return;
        }
      });

      const femaleRate = res.data["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100 / 255) * res.data["capture_rate"]);

      const eggGroups = res.data["egg_groups"]
        .map(group => {
          return group.name
            .toLowerCase()
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");

      const hatchSteps = 255 * (res.data["hatch_counter"] + 1);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroups,
        hatchSteps
      });
    });

    this.setState({
      imageUrl,
      pokeIndex: pokemonIndex,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense
      },
      height,
      weight,
      abilities,
      evs
    });
  }
  render() {
    let { pokemonIndex } = this.props.match.params;

    const {
      name,
      abilities,
      imageUrl,
      pokeIndex,
      types,
      stats,
      height,
      weight,
      evs,
      description,
      genderRatioFemale,
      genderRatioMale,
      catchRate,
      eggGroups,
      hatchSteps
    } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col-5">
                      <h3>{pokeIndex}</h3>
                    </div>
                    <div className="col-7">
                      <div className="float-right">
                        {types.map(type => (
                          <span
                            key={type}
                            className="badge badge-primary badge-pill mr-1"
                          >
                            {capitalizeFirstLetter(type)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-3">
                      <img src={imageUrl} alt={name} />
                    </div>
                    <div className="col-md-9">
                      <h4 className="mx-auto">{capitalizeFirstLetter(name)}</h4>
                      <div className="row align-items-center">
                        <div className="col-12 col-md-3">HP</div>
                        <div className="col-12 col-md-9">
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressBar"
                              style={{ width: `${stats.hp}%` }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <small>{stats.hp}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-12 col-md-3">Attack</div>
                        <div className="col-12 col-md-9">
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressBar"
                              style={{ width: `${stats.attack}%` }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <small>{stats.attack}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-12 col-md-3">Defense</div>
                        <div className="col-12 col-md-9">
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressBar"
                              style={{ width: `${stats.defense}%` }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <small>{stats.defense}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-12 col-md-3">Speed</div>
                        <div className="col-12 col-md-9">
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressBar"
                              style={{ width: `${stats.speed}%` }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <small>{stats.speed}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-12 col-md-3">Special Attack</div>
                        <div className="col-12 col-md-9">
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressBar"
                              style={{ width: `${stats.specialAttack}%` }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <small>{stats.specialAttack}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-12 col-md-3">Special Defense</div>
                        <div className="col-12 col-md-9">
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressBar"
                              style={{ width: `${stats.specialDefense}%` }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <small>{stats.specialDefense}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col">
                        <p className="p-2">{description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title text-center">Profile</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="float-right">Height:</div>
                        </div>
                        <div className="col-md-6">
                          <div className="float-left">{height} ft</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="float-right">Weight:</div>
                        </div>
                        <div className="col-md-6">
                          <div className="float-left">{weight} lbs</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="float-right">Catch Rate:</div>
                        </div>
                        <div className="col-md-6">
                          <div className="float-left">{catchRate}%</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="float-right">Gender Ratio:</div>
                        </div>
                        <div className="col-md-6">
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{
                                width: `${genderRatioFemale}%`,
                                backgroundColor: "pink"
                              }}
                              aria-valuenow="15"
                              aria-valuemin="0"
                              aria-valuemax="0"
                            >
                              <small>{genderRatioFemale}</small>
                            </div>
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{
                                width: `${genderRatioMale}%`,
                                backgroundColor: "green"
                              }}
                              aria-valuenow="15"
                              aria-valuemin="0"
                              aria-valuemax="0"
                            >
                              <small>{genderRatioMale}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="float-right">Egg groups:</div>
                        </div>
                        <div className="col-md-6">
                          <div className="float-left">{eggGroups}</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="float-right">Hatch Steps:</div>
                        </div>
                        <div className="col-md-6">
                          <div className="float-left">{hatchSteps}</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="float-right">Abilities:</div>
                        </div>
                        <div className="col-md-6">
                          <div className="float-left">{abilities}</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="float-right">EVs:</div>
                        </div>
                        <div className="col-md-6">
                          <div className="float-left">{evs}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import axios from 'axios';

const apiEndPoint = `https://pokeapi.co`;
const config = {
  headers: { 'Content-Type': 'application/json' }
};

export function getAllPokemon() {
  return axios.get(`${apiEndPoint}/api/v2/pokemon/`, config);
}

export function getPokemonByType(nameId) {
  return axios.get(`${apiEndPoint}/api/v2/type/${nameId}`, config);
}

export function getPokemonStats(Id) {
  return axios.get(`${apiEndPoint}/api/v2/pokemon/${Id}/`, config);
}

export function getRandomPokemon(pokemonArray) {
  return pokemonArray[Math.floor(Math.random() * pokemonArray.length)];
}

export function getPromiseData(promisesArray) {
  return new Promise((resolve, reject) => {
    Promise.all(promisesArray)
      .then(res => {
        return res.map(type => {
          type.json()
        });
      })
      .then(res => {
        Promise.all(res)
          .then(resolve);
      })
      .catch(reject);
  })
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function lpad(value, padding) {
  var zeroes = new Array(padding + 1).join("0");
  return (zeroes + value).slice(-padding);
}

export const typeColors = {
  bug: '#729f3f',
  dragon: '#53a4cf',
  fairy: '#fdb9e9',
  fire: '#fd7c23',
  ghost: '#7b63a3',
  ground: '#ab9842',
  normal: '#a4acae',
  psychic: '#f366b9',
  steel: 'grey',
  dark: '#707070',
  electric: '#efd536',
  fighting: '#d56723',
  flying: '#3dc7ef',
  grass: '#9ccc51',
  ice: '#51c4e7',
  poison: '#b97fc9',
  rock: '#a38c21',
  water: '#4492c4'
}
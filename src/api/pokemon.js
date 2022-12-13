import { handleWrongResponses } from "../js/handleErrors"
export const getAllPokemon = async () => {
  try {
    //request process
    const result = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
    );
    //any kind of validation
    if (!result.ok) {
      handleWrongResponses(result);
    }
    //if it's ok parse data and return
    const data = await result.json();
    return data;
  } catch (err) {
    //catching error and throwing again towards whosoever call this fn,
    throw err;
  }
};

export const getPokemon = async (url) => {
  try {
    const result = await fetch(url);
    //result.wathever do validations
    if (!result.ok) {
      handleWrongResponses(result);
    }
    //it'ok
    const data = await result.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const getResource = async (url) => {
  try {
    const result = await fetch(url);
    //result.wathever do validations
    if (!result.ok) {
      handleWrongResponses(result);
    }
    //it'ok
    const data = await result.json();
    return data;
  } catch (err) {
    throw err;
  }
};